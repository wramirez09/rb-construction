const OfferList = ({ text }: { text: string }) => {
  return (
    <li
      className={`mb-1 text-base text-body-color dark:text-dark-6`}
      style={{ listStyle: "circle " }}
    >
      {text}
    </li>
  );
};

export default OfferList;
