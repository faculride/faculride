import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
});

export async function criarDoacao(req: Request, res: Response): Promise<void> {
  try {
    const { valor, descricao, email } = req.body;

    const preference = new Preference(client);

    const pagamento = await preference.create({
  body: {
    items: [
      {
        id: "doacao-faculride",
        title: descricao || "Doação FaculRide",
        quantity: 1,
        currency_id: "BRL",
        unit_price: Number(valor),
      },
    ],
    payer: {
      email,
    },
    back_urls: {
      success: "https://www.google.com",
      failure: "https://www.google.com",
      pending: "https://www.google.com"
    },
    auto_return: "approved"
  },
});

    res.json({ url: pagamento.init_point });
  } catch (error: any) {
    res.status(500).json({ erro: error.message });
  }
}
