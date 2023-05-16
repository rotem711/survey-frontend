import http from "../http";

export async function getQuestionList(payload: any) {
  const { data } = await http.post("/api/questions/new", payload);
  return data;
}
