import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEnrty() {
  const { totals } = useOrderDetails();

  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {formatCurrency(totals["scoops"] + totals["toppings"])}</h2>
    </>
  );
}
