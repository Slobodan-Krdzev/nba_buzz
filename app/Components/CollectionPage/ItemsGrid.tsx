import { Product } from "@/app/Types/Types";
import ItemsLister from "../Common/ItemsLister";

type ItemsGridProps = {
  items: Product[];
};

const ItemsGrid = ({ items }: ItemsGridProps) => {

  return (
    <section>
      <ItemsLister title="The Joker Collection" items={items} />
    </section>
  );
};

export default ItemsGrid;
