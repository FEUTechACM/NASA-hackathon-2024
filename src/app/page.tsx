import ExtendedContinentDrawer from "@/components/drawer";
import World from "@/components/globe";
import SettingsComponent from "@/components/settings";
const Page = () => {
  return (
    <main>
      <SettingsComponent />
      <World />
      <ExtendedContinentDrawer />
    </main>
  );
};

export default Page;