import orchestrator from "tests/orchestrator.js";
import email from "infra/email.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();
    await email.send({
      from: "Lucas <lucas@curso.dev>",
      to: "contato@curso.dev",
      subject: "Teste de assunto",
      text: "Teste de corpo",
    });

    await email.send({
      from: "Lucas <lucas@curso.dev>",
      to: "contato@curso.dev",
      subject: "Teste de último email",
      text: "Teste de corpo do último email",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<lucas@curso.dev>");
    expect(lastEmail.recipients[0]).toBe("<contato@curso.dev>");
    expect(lastEmail.subject).toBe("Teste de último email");
    expect(lastEmail.text).toBe("Teste de corpo do último email\r\n");
  });
});
