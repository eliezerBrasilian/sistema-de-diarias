import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";
export class AppUtils {
  static FormatPhone(phone: string) {
    if (phone.length !== 11) {
      throw new Error("O número deve ter 11 dígitos.");
    }

    const ddd = phone.slice(0, 2);
    const primeiraParte = phone.slice(2, 7);
    const segundaParte = phone.slice(7, 11);

    return `(${ddd}) ${primeiraParte}-${segundaParte}`;
  }

  static DateToDayMonthYear(date: Date) {
    const dia = date.getDate();
    var mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    const formatedDate = `${dia < 10 ? "0" + dia : dia}/${
      mes < 10 ? "0" + mes : mes
    }/${ano}`;

    return formatedDate;
  }
  static copiaChavePixParaTeclado(chave: string) {
    navigator.clipboard
      .writeText(chave as string)
      .then(() => {
        toast("chave pix copiada");
      })
      .catch((_err) => {
        alert("Erro ao copiar chave pix");
      });
  }

  static milisegundosParaDiaAbreviadoDeMesDeAnoHoraMinutoSegundo(
    milisegundos: number
  ): string {
    console.log("milisegundos: " + milisegundos);

    try {
      const data = new Date(milisegundos);

      console.log("-------data: " + data);

      if (isNaN(data.getTime())) {
        throw new RangeError("Invalid time value");
      }

      return format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss", {
        locale: ptBR,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static milisegundosParaDiaAbreviadoDeMesDeAno(milisegundos: number): string {
    const data = new Date(milisegundos);
    return format(data, "E. dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  static trataErro(message: string, callback: () => void) {
    if (message == "Access Denied") {
      window.alert("Acesso negado !");
      callback();
    }

    if (message == "AxiosError: Network Error") {
      window.alert("Erro ao se conectar com o servidor!");
      callback();
    }
  }
}
