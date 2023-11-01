import { Category } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const categoryMap: Record<
  Category,
  {
    label: string;
    color:
      | "tomato"
      | "iris"
      | "green"
      | "crimson"
      | "pink"
      | "plum"
      | "purple"
      | "violet"
      | "mint"
      | "lime"
      | "indigo";
  }
> = {
  SHIPPING: { label: "Shipping", color: "purple" },
  DISCOUNT: { label: "Discount", color: "iris" },
  ORDER: { label: "Order", color: "green" },
  HOURS: { label: "Hours", color: "crimson" },
  ADDRESS: { label: "Address", color: "pink" },
  REFUND: { label: "Refund", color: "plum" },
  MISSING: { label: "Missing", color: "tomato" },
  DAMAGE: { label: "Damage", color: "violet" },
  RETURN: { label: "Return", color: "mint" },
  WARRANTY: { label: "Warranty", color: "lime" },
  OTHER: { label: "Other", color: "indigo" },
};

const QuestionCategoryBadge = ({ category }: { category: Category }) => {
  return (
    <Badge color={categoryMap[category].color}>
      {categoryMap[category].label}
    </Badge>
  );
};

export default QuestionCategoryBadge;
