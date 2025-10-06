import SectionTitle from "@/app/Components/Common/SectionTitle";
import OrdersList from "@/app/Components/Profile/OrdersList";
import UserCard from "@/app/Components/Profile/UserCard";
import ContactForm from "@/app/Components/Contact/ContactForm";
import { Order, UserProfile } from "@/app/Types/Types";
import { useTranslations } from "next-intl";

// For now we provide dummy data. Replace with API fetch when ready.
function getDummyUser(): UserProfile {
  return {
    id: "u_001",
    firstName: "Jordan",
    lastName: "Smith",
    imageUrl: "/poses/3.jpg",
    address: "123 Court Ave, Hoops City, USA",
    email: "jordan.smith@example.com",
    phone: "+1 (555) 234-9876",
  };
}

function getDummyOrders(): Order[] {
  return [
    {
      id: "1023",
      date: new Date().toISOString(),
      status: "open",
      total: 189.99,
      items: [
        {
          productId: "p_01",
          title: "NBABUZZ Classic Tee",
          quantity: 1,
          price: 49.99,
          imageUrl: "/poses/1.jpg",
        },
        {
          productId: "p_02",
          title: "Premium Hoodie",
          quantity: 2,
          price: 70,
          imageUrl: "/poses/2.jpg",
        },
      ],
    },
    {
      id: "1017",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      status: "finished",
      total: 89.99,
      items: [
        {
          productId: "p_03",
          title: "Performance Shorts",
          quantity: 1,
          price: 39.99,
          imageUrl: "/poses/4.jpg",
        },
        {
          productId: "p_04",
          title: "Crew Socks (3 Pack)",
          quantity: 1,
          price: 50,
          imageUrl: "/poses/5.jpg",
        },
      ],
    },
    {
      id: "1003",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
      status: "finished",
      total: 59.99,
      items: [
        {
          productId: "p_05",
          title: "Graphic Cap",
          quantity: 1,
          price: 29.99,
          imageUrl: "/poses/6.jpg",
        },
        {
          productId: "p_06",
          title: "Water Bottle",
          quantity: 1,
          price: 30,
          imageUrl: "/poses/7.jpg",
        },
      ],
    },
  ];
}

export default function ProfilePage() {
  const t = useTranslations("profile");
  const user = getDummyUser();
  const orders = getDummyOrders();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionTitle title={t("title")} />
      <div className="grid grid-cols-1 gap-6 lg:gap-8">
        <UserCard user={user} />
        <div>
          <h3 className="text-xl font-bold text-titles mb-3">{t("ordersTitle")}</h3>
          <OrdersList orders={orders} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-titles mb-3">{t("helpTitle")}</h3>
          <p className="text-titles/80 mb-4">{t("helpText")}</p>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}


