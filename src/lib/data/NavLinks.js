import { MdHomeFilled } from "react-icons/md";
import { TbArrowsDownUp } from "react-icons/tb";
import { PiChartDonutFill } from "react-icons/pi";
import { PiTipJarBold } from "react-icons/pi";
import { BsReceiptCutoff } from "react-icons/bs";


export const navLinks = [
    {
      name: "Home",
      icon: <MdHomeFilled />,
      link: "/",
      id: 1,
    },
    {
      name: "Transactions",
      icon: <TbArrowsDownUp />,
      link: "/views/transactions",
      id: 2,
    },
    {
      name: "Budgets",
      icon: <PiChartDonutFill />,
      link: "/views/budgets",
      id: 3,
    },

    {
      name: "Pots",
      icon: <PiTipJarBold />,
      link: "/views/pots",
      id: 4,
    },
    {
      name: "Recurring bills",
      icon: <BsReceiptCutoff />,
      link: "/views/recurring-bills",
      id: 5,
    },
  ];