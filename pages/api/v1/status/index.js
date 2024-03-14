function getStatus(req, res) {
  res.status(200).json({
    valor: "Os alunos do curso.dev são pessoas acima da média",
  });
}

export default getStatus;
