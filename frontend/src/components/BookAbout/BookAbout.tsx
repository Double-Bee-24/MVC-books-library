import "./BookAbout.css";

export default function BookAbout(): JSX.Element {
  return (
    <div className="book-about-container">
      <p>Про книгу</p>
      <hr className="small-hr" />
      <p className="book-about-text">
        Ця книга є захопливим твором, який відкриває перед читачем нові
        горизонти знань та емоцій. Автор майстерно поєднує цікавий сюжет із
        глибокими роздумами про життя. Видання ідеально підійде для тих, хто
        цінує якісну літературу та захопливі історії.
      </p>
    </div>
  );
}
