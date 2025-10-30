import {
	Badge,
	Button,
	ButtonGroup,
	InlineStack,
	ResourceItem,
	ResourceList,
	Text
} from "@shopify/polaris";
import { CheckCircleIcon, DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import { useContext, useState } from "react";
import TodoContext from "../context/TodoContex";
import { removeTodoAPI, updateTodoAPI } from "../api/todoFetchAPI";

const TodosSection = () => {
	const [selectedItems, setSelectedItems] = useState([]);
	const [isHeaderOpen, setIsHeaderOpen] = useState(false);
	const [editingTodo, setEditingTodo] = useState(null);
	const [editTitle, setEditTitle] = useState("");
	const { todos, setTodos, loading: fetchLoading } = useContext(TodoContext);

	const completeTodo = async (id, status) => {
		const res = await updateTodoAPI(id, { completed: status });
		if (res.success) {
			setTodos((prev) => {
				return prev.map((t) => {
					if (t.id === parseInt(id)) t = { ...t, completed: status };
					return t;
				});
			});
		}
	};

	const removeTodo = async (id) => {
		const res = await removeTodoAPI(id);
		if (res.success)
			setTodos((prev) => prev.filter((todo) => todo.id !== parseInt(id)));
	};

	const updateTitleTodo = async (id, title) => {
		const res = await updateTodoAPI(id, { title: title });
		if (res.success) {
			setTodos((prev) => {
				return prev.map((t) => {
					if (t.id === parseInt(id)) t = { ...t, title: title };
					return t;
				});
			});
		}
	};

	const EditTodo = (todo) => {
		setEditingTodo(todo.id);
		setEditTitle(todo.title);
	};

	const handleSelectionChange = (items) => {
		setSelectedItems(items);
		if (items.length === 0) setIsHeaderOpen(false);
		else setIsHeaderOpen(true);
	};

	const handleInputEnter = (e, id) => {
		if (e.key === "Enter") {
			updateTitleTodo(id, editTitle);
			setEditingTodo(null);
		}
	};

	const promotedBulkActions = [
		{
			content: "Complete",
			onAction: async () => {
				for (const id of selectedItems) {
					await completeTodo(id, true);
				}
				setSelectedItems([]);
			}
		},
		{
			content: "Incomplete",
			onAction: async () => {
				for (const id of selectedItems) {
					await completeTodo(id, false);
				}
				setSelectedItems([]);
			}
		},
		{
			content: "Delete",
			onAction: () => {
				for (const id of selectedItems) {
					removeTodo(id);
				}
				setSelectedItems([]);
			}
		}
	];

	return (
		<ResourceList
			loading={fetchLoading}
			resourceName={{ singular: "todo", plural: "todos" }}
			items={todos}
			selectable
			selectedItems={selectedItems}
			onSelectionChange={handleSelectionChange}
			promotedBulkActions={promotedBulkActions}
			showHeader={isHeaderOpen}
			renderItem={(todo) => {
				const { id, title } = todo;
				return (
					<ResourceItem id={id} name={title}>
						<InlineStack align="space-between" blockAlign="center">
							{editingTodo !== id ? (
								<Text variant="bodyLg" as="p" fontWeight={600}>
									{title}
								</Text>
							) : (
								<input
									style={{ borderRadius: "2px", padding: "5px" }}
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
									onBlur={() => setEditingTodo(null)}
									autoFocus
									onKeyDown={(e) => handleInputEnter(e, id)}
								/>
							)}
							<div style={{ display: "flex", gap: "10px" }}>
								{todo.completed ? (
									<Badge tone="success">Complete</Badge>
								) : (
									<Badge tone="warning">Incomplete</Badge>
								)}
								<ButtonGroup>
									<Button icon={EditIcon} onClick={() => EditTodo(todo)} />
									<Button
										icon={CheckCircleIcon}
										onClick={() => completeTodo(id, true)}
									/>
									<Button icon={DeleteIcon} onClick={() => removeTodo(id)} />
								</ButtonGroup>
							</div>
						</InlineStack>
					</ResourceItem>
				);
			}}
		/>
	);
};

export default TodosSection;
