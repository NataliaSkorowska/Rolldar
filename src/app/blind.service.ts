import { Injectable } from '@angular/core';
import { Blind } from './offer/blind.model';

@Injectable({
  providedIn: 'root'
})
export class BlindService {
  getBlinds(): Blind[]{
    return[
      {
        id:1,
        url1: "assets/imgs/alumin1.jpg",
        url2:"assets/imgs/alumin2.jpg",
        url3: "assets/imgs/alum3.jpg",
        url4:"assets/imgs/alum4.jpg",
        name: "Aluminiowe",
        info: "Sprawdzą się idealnie nie tylko w sypialni czy salonie," +
         "ale także w kuchni czy łazience, gdyż aluminium charakteryzuje się" +
          "wysoką odpornością na wilgoć oraz wodę.",
        info1: " Żaluzje aluminiowe są też " +
        "łatwe w utrzymaniu czystości i przy tym wszystkim stanowią niezwykle"
        +"elegancką dekorację okna."
      },
      {
        id:2,
        url1: "assets/imgs/zaslony1.jpg",
        url2:"assets/imgs/zaslony2.jpg",
        url3: "assets/imgs/zaslony3.jpg",
        url4:"assets/imgs/zaslony4.jpg",
        name: "Zasłony",
        info: "Ten typ dekoracji stanowi efektowną ozdobę nie tylko mieszkań" +
        "ale także biur czy instytucji. Poprzez zamontowanie odpowiednich zasłon" +
        "możesz nadać każdemu pomieszczeniu wyjątkowy charakter i przytulny klimat.",
         info1:"Wysoka jakość materiałów i szeroki wybór wzorów gwarantuje wysoki stopień"
         +"personalizacji produktu. Oferujemy zasłony i firany na szynach KS, także elektryczne."
      },
      {
        id:3,
        url1: "assets/imgs/rzymska1.jpg",
        url2:"assets/imgs/rzymska2.jpg",
        url3: "assets/imgs/rzymska3.jpg",
        url4:"assets/imgs/rzymska4.jpg",
        name: "Rzymskie",
        info: "Znakiem charakterystycznym rolet rzymskich jest" +
        "sposób ich składania – tkanina nie jest tu zwijana, jak w przypadku" +
        "innych rodzajów rolet. Unosząc roletę rzymską tworzą się eleganckie" +
        "i efektywne marszczenia",
        info1:"Pełną one wiele funkcji i są " +
        "jednocześnie piękną dekoracją, ale także ochroną przed słońcem" +
        "i gwarancją prywatności.",
      },
      {
        id:4,
        url1: "assets/imgs/plisy1.jpg",
        url2:"assets/imgs/plisy2.jpg",
        url3: "assets/imgs/plisy3.jpg",
        url4:"assets/imgs/plisy4.jpg",
        name: "Plisy",
        info: "Plisy to idealne rozwiązanie dla wszystkich, którym zależy" +
        "na precyzyjnej regulacji ilości wpadającego do pomieszczenia świata.",
        info1:" Dają one możliwość zasłonięcia dowolnego fragmentu okna tak aby stworzyć" +
        "optymalne warunki do pracy czy odpoczynku"
      },
      {
        id:5,
        url1: "assets/imgs/dziennoc1.jpg",
        url2:"assets/imgs/dziennoc2.jpg",
        url3: "assets/imgs/dziennoc3.jpg",
        url4:"assets/imgs/dziennoc4.jpg",
        name: "Dzień i noc",
        info: "Mechanizm rolet dzień noc opiera się na dwóch" +
         "warstwach naprzemiennych pasów z przeźroczystej siatki" +
          "i kryjącej tkaniny w dowolnym kolorze.",
        info1:"Poprzez przesuwanie ich" +
        "względem siebie możemy dostosowywać ilość wpadającego światła tak aby "
        + "stworzyć optymalne warunki w danym pomieszczeniu zarówno w ciągu "
        + "dnia ja i w nocy."
      },
      {
        id: 6,
        url1: "assets/imgs/markiza1.jpg",
        url2:"assets/imgs/markiza2.jpg",
        url3: "assets/imgs/markiza3.jpg",
        url4:"assets/imgs/markiza4.jpg",
        name: "Markizy",
        info: "Podstawowym zadaniem markizy jest ochrona przeciwsłoneczna" +
         "np. tarasu, balkonu, ogródka restauracyjnego czy zewnętrznego stoiska.",
        info1:"Pełnią one nie tylko rolę zaciemniającą, ale także stanowią niezwykle"
        + "efektowny element dekoracyjny."
      },
      {
        id:7,
        url1: "assets/imgs/zewnetrzne1.jpg",
        url2:"assets/imgs/zewnetrzne2.jpg",
        url3: "assets/imgs/zewnetrzne3.jpg",
        url4:"assets/imgs/zewnetrzne4.jpg",
        name: "Zewnętrzne",
        info: "Rolety zewnętrzne cieszą się największym zainteresowaniem," +
         "a zawdzięczają to swojej wielofunkcyjności oraz wysokiej estetyce.",
        info1: "Parametry rolety można odpowiednio dobrać tak, aby kolorystycznie" +
        "komponowała się z elewacją budynku. "
      },
      {
        id:8,
        url1: "assets/imgs/wolnowiszace1.jpg",
        url2:"assets/imgs/wolnowiszace2.jpg",
        url3: "assets/imgs/wolnowiszace1.jpg",
        url4:"assets/imgs/wolnowiszace2.jpg",
        name: "Wolnowiszące",
        info: "Ten typ dekoracji sprawdzi się szczególnie gdy zależy" +
         "nam na osłonięciu dużych powierzchni okiennych. Szeroka gama" +
         "kolorystyczna gwarantuje dopasowanie rolet do każdego wnętrza.",
          info1:"Zapewniają one skuteczne odcięcie promieni słonecznych i łatwo" +
          "utrzymuje się je w czystości."
      },
      {
        id:9,
        url1: "assets/imgs/moskitiera1.jpg",
        url2:"assets/imgs/moskitiera2.jpg",
        url3: "assets/imgs/moskitiera3.jpg",
        url4:"assets/imgs/moskitiera4.jpg",
        name: "Moskitiery",
        info: "Moskitiery to idealny sposób na walkę z wszelkimi insektami," +
         "które po otwarciu okien czy drzwi próbują przedostać się do naszego" +
         "mieszkania.",
        info1:"Różne sposoby otwierania pozwolą Ci wybrać najwygodniejszy" +
        "dla Ciebie i Twoich potrzeb sposoób otwierania. Moskitiery to idealne " +
        "połączenie eleganckiego wyglądu i ochrony przed owadami."
      },
      {
        id:10,
        url1: "assets/imgs/drewno1.jpg",
        url2:"assets/imgs/drewno2.jpg",
        url3: "assets/imgs/drewno3.jpg",
        url4:"assets/imgs/drewno4.jpg",
        name: "Żaluzje drewniane",
        info: "Drewno to materiał, którego użycia sprawia, że" +
        "przytulność i ciepło danego pomieszczenia znacznie wzrasta.",
        info1: "Sprawdzą się idealnie gdy zależy nam na eko wyglądzie naszej kuchni," +
        "sypialni czy salonu."
      },
      {
        id:11,
        url1: "assets/imgs/brama1.jpg",
        url2:"assets/imgs/brama2.jpg",
        url3: "assets/imgs/brama3.jpg",
        url4:"assets/imgs/brama4.jpg",
        name: "Bramy",
        info: "Bramy tego typu znajdują zastosowanie nie tylko w budynkach mieszkalnych, ale także przemysłowych." + 
        "Mechanizm jest w pełni zautomatyzowany z możliwością otwierania awaryjnego.",
        info1: "Profile bramy, która jest wykonana z aluminium są wypełnione pianką poliuretanową."
        + "Bramy rolowane zapewniają komfort użytkowania, estetyczny wygląd komponujący się z pozostałymi elementami budynku" + 
        "oraz bezpieczeństwo dzięki wysokiej jakości zastosowanych materiałów."
      }
  ];
}

  constructor() { }

  getBlind(id: number): Blind{
    return this.getBlinds().find((blind)=> blind.id === id);
  }
}
