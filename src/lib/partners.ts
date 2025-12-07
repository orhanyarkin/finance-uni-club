export interface Partner {
  id: string;
  name: string;
  logo: string;
  nameless: boolean;
  website: string;
  discount: string;
}

export const partners: Partner[] = [
  {
    id: "ekleristan",
    name: "Ekleristan",
    logo: "nameless_ekleristan.png",
    nameless: true,
    website: "https://www.ekleristan.com",
    discount: "%15 İndirim",
  },
  {
    id: "devils-coffee",
    name: "Devil's Coffee Shop",
    logo: "Devil's Coffee Shop.png",
    nameless: false,
    website: "https://www.instagram.com/sensei.devils.coffee.shop",
    discount: "%15 İndirim",
  },
  {
    id: "di-hola",
    name: "Di Hola Coffe & Art",
    logo: "Di Hola Coffe & Art.png",
    nameless: false,
    website: "#",
    discount: "%15 İndirim",
  },
  {
    id: "hamart",
    name: "Hamart Atölye Cafe",
    logo: "Hamart Atölye Cafe.png",
    nameless: false,
    website: "#",
    discount: "%15 İndirim",
  },
  {
    id: "miniera",
    name: "Miniera Coffee",
    logo: "Miniera Coffee.png",
    nameless: false,
    website: "#",
    discount: "%15 İndirim",
  },
  {
    id: "fresh-pasta",
    name: "Fresh Pasta",
    logo: "nameless_fresh_pasta.png",
    nameless: true,
    website: "#",
    discount: "%15 İndirim",
  },
  {
    id: "waffle-levent",
    name: "Waffle Levent",
    logo: "nameless_waffle_levent.png",
    nameless: true,
    website: "#",
    discount: "%15 İndirim",
  },
];
