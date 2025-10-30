import { FormLayout, Modal, TextField } from "@shopify/polaris"
import { useContext, useState } from "react"
import { addTodoAPI } from "../api/todoFetchAPI"
import TodoContext from "../context/TodoContex";

const ModalSection = ({isModalOpen, handleChange, loading}) => {
  const { setTodos} = useContext(TodoContext);
  const [value, setValue] = useState("")
  
  const addTodo = async (title) => {
    const res = await addTodoAPI(title)
    if(res.success)
      setTodos((prev) => [res.data, ...prev]);
  }

  const handleSubmit = () => {
		if (!value) return
		addTodo(value)
		setValue("")
	}
  return (
    <Modal
      open={isModalOpen}
      onClose={handleChange}
      title="Add New Todo"
      primaryAction={{
        content: "Add",
        onAction: () => {
          handleSubmit()
          handleChange()
        },
      loading: loading
      }}
      secondaryActions={{
        content: "Cancel",
        onAction: () => handleChange()
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label='Titile'
            value={value}
            onChange={(value) => {setValue(value)}}
            autoComplete={false}
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  )
}

export default ModalSection
