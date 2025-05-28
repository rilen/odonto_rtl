import axios from "axios";

const supabaseURL = "https://seu-projeto.supabase.co";
const apiKey = "sua-chave-api";

async function getData(endpoint: string) {
    try {
        const response = await axios.get(`${supabaseURL}/rest/v1/${endpoint}`, {
            headers: { apikey: apiKey }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
        return null;
    }
}

export { getData };
