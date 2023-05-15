export default interface QuestionProps {
  id: Number
  question: String
  options: {
    id: Number
    text: String
  }[]
  onSubmit: (payload: Number[]) => void
}
