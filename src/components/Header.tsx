export function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 15,
        backgroundColor: "#2A856A",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <h1 style={{ color: "#fff", fontSize: 19 }}>Sistema de Diárias</h1>
    </div>
  );
}
