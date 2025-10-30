import {
	Card,
	Page,
	Pagination,
} from "@shopify/polaris";
import { useCallback,useState } from "react";
import ModalSection from "../components/ModalSection";
import TodosSection from "../components/TodosSection";

const TodoList = () => {
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const handleChange = useCallback(() => {
		setIsModalOpen(!isModalOpen);
	}, [isModalOpen]);

	return (
		<Page
			title="Todos"
			primaryAction={{
				content: "Create",
				onAction: handleChange
			}}
		>
			<Card>
				<ModalSection
					isModalOpen={isModalOpen}
					handleChange={handleChange}
					loading={loading}
				/>
				<TodosSection/>
				{/* <Pagination
					hasPrevious
					onPrevious={() => {
						console.log("Previous")
					}}
					hasNext
					onNext={() => {
						console.log("Next")
					}}
				/> */}
			</Card>
		</Page>
	);
};
export default TodoList;
