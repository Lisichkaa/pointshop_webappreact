import squirrelImg from "../images/belochka.jpg";
import coffeeImg from "../images/coffee.png";
//import noseImg from "../images/nosik.jpg";
import questionImg from "../images/question.png";
import cakeImg from "../images/cake.jpg";


export function getData() {
  return [
    { title: "Белочка", amount: 100, Image: squirrelImg, id:1 },
    { title: "Вопросики", amount: 1000, Image: questionImg,id:2 },
    { title: "Булочка с листиком", amount: 99999, Image: cakeImg, id:6 },
    { title: "Кофе", amount: 10000, Image: coffeeImg , id:3},
    //{ title: "Носик", amount: 23, Image: noseImg, id:4 },
    { title: "Булочка с листиком", amount: 0, Image: cakeImg, id:5 },
  ];
}