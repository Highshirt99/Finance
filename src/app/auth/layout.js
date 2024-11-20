import AuthHeader from "@/components/AuthHeader ";

export default function AuthLayout({ children }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
