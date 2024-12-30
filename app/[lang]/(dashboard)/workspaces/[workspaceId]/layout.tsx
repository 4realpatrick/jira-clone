import { PortableSetting } from "@/components/common/portable-setting";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed bottom-5 right-5 flex flex-col space-y-2">
        <PortableSetting />
      </div>
      {children}
    </>
  );
}
