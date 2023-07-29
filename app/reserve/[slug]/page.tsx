import Header from "./components/Header";
import Form from "./components/Form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "OpenTable | Reserve",
  description: "Generated by create next app",
};
function ReservationPage() {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header />
        <Form />
      </div>
    </div>
  );
}

export default ReservationPage;
