import database from "infra/database.js";

async function getStatus(req, res) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  res.status(200).json({
    valor: "Os alunos do curso.dev são pessoas acima da média",
  });
}

export default getStatus;
