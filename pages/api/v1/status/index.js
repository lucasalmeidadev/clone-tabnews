function status(request, response) {
  return response.status(200).json({ status: "OK" });
}

export default status;
