import MainLayout from "@layouts/MainLayout";
import Home from "@components/Home/Home";

export default function dashboard() {
  return (
    <MainLayout page="Home">
      <Home/>
    </MainLayout>
  );
}
