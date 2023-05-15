import http from "../http";

export async function getQuestionList() {
  const { data } = await http.get("/api/questions/");
  return data;
}
