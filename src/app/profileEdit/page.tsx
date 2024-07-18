import Tab from "@/components/tab";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import InputForm from "@/components/inputForm";

export default function Home() {
  return (
    <>
      <Header />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <InputForm></InputForm>
      </main>
    </>
  );
}
