export const SUPPORTED_FORM_LANGUAGES = ["ru", "de", "uk"];

const TEXTS = {
  ru: {
    simple: {
      firstName: "Личное имя, как оно указано в немецком документе или паспорте.",
      lastName: "Фамилия, как она указана в немецком документе или паспорте.",
      birthDate: "Дата рождения. Обычно ее сверяют с паспортом, Aufenthaltstitel или свидетельством о рождении.",
      birthPlace: "Место рождения: город или населенный пункт, указанный в документе.",
      nationality: "Гражданство, указанное в паспорте, Aufenthaltstitel или другом официальном документе.",
      gender: "Пол/гендерная отметка, как она указана в документе или предусмотрена в форме.",
      phone: "Телефон для связи, если ведомству понадобится уточнить вопрос.",
      email: "Электронная почта для связи, если она запрашивается в форме.",
      signatureDate: "Дата подписи заявления."
    },
    what: "Что означает поле:",
    where: "Где обычно найти:",
    defaultWhat: (label) => `Поле относится к пункту: ${label}.`,
    defaultWhere: "В официальных документах, письмах ведомств, договорах или справках, которые относятся к этому вопросу.",
    choice: (label) => `Вопрос уточняет пункт: ${label}.`,
    multiChoice: (label) => `Вопрос перечисляет несколько возможных вариантов по пункту: ${label}.`,
    date: (label) => `Дата, связанная с пунктом: ${label}.`,
    boxed: (label) => `Короткое значение или номер для пункта: ${label}.`
  },
  de: {
    simple: {
      firstName: "Vorname, wie er im deutschen Dokument oder Pass steht.",
      lastName: "Nachname, wie er im deutschen Dokument oder Pass steht.",
      birthDate: "Geburtsdatum. Es steht meist im Pass, Aufenthaltstitel oder in der Geburtsurkunde.",
      birthPlace: "Geburtsort: Stadt oder Ort, wie er im Dokument steht.",
      nationality: "Staatsangehörigkeit, wie sie im Pass, Aufenthaltstitel oder einem anderen offiziellen Dokument steht.",
      gender: "Geschlecht bzw. Geschlechtseintrag, wie im Dokument oder im Formular vorgesehen.",
      phone: "Telefonnummer für Rückfragen der Behörde.",
      email: "E-Mail-Adresse für Kontakt, falls sie im Formular abgefragt wird.",
      signatureDate: "Datum der Unterschrift des Antrags."
    },
    what: "Was bedeutet das Feld:",
    where: "Wo findet man das meist:",
    defaultWhat: (label) => `Das Feld gehört zu diesem Punkt: ${label}.`,
    defaultWhere: "In offiziellen Dokumenten, Behördenschreiben, Verträgen oder Bescheinigungen zu diesem Thema.",
    choice: (label) => `Die Frage klärt diesen Punkt: ${label}.`,
    multiChoice: (label) => `Die Frage listet mehrere mögliche Angaben zu diesem Punkt auf: ${label}.`,
    date: (label) => `Ein Datum zu diesem Punkt: ${label}.`,
    boxed: (label) => `Ein kurzer Wert oder eine Nummer zu diesem Punkt: ${label}.`
  },
  uk: {
    simple: {
      firstName: "Особисте ім'я, як воно зазначене в німецькому документі або паспорті.",
      lastName: "Прізвище, як воно зазначене в німецькому документі або паспорті.",
      birthDate: "Дата народження. Зазвичай її звіряють з паспортом, Aufenthaltstitel або свідоцтвом про народження.",
      birthPlace: "Місце народження: місто або населений пункт, зазначений у документі.",
      nationality: "Громадянство, зазначене в паспорті, Aufenthaltstitel або іншому офіційному документі.",
      gender: "Стать/гендерна позначка, як вона зазначена в документі або передбачена у формі.",
      phone: "Телефон для зв'язку, якщо відомству потрібно буде уточнити питання.",
      email: "Електронна пошта для зв'язку, якщо вона запитується у формі.",
      signatureDate: "Дата підпису заяви."
    },
    what: "Що означає поле:",
    where: "Де зазвичай знайти:",
    defaultWhat: (label) => `Поле стосується пункту: ${label}.`,
    defaultWhere: "В офіційних документах, листах від відомств, договорах або довідках, які стосуються цього питання.",
    choice: (label) => `Питання уточнює пункт: ${label}.`,
    multiChoice: (label) => `Питання перелічує кілька можливих варіантів щодо пункту: ${label}.`,
    date: (label) => `Дата, пов'язана з пунктом: ${label}.`,
    boxed: (label) => `Коротке значення або номер для пункту: ${label}.`
  }
};

const DETAILED_HINTS = {
  rentenversicherung: {
    ru: {
      what: "Rentenversicherungsnummer или Sozialversicherungsnummer - персональный номер в немецкой системе пенсионного/социального страхования. Он нужен для однозначной идентификации в страховых и трудовых документах.",
      where: "Его часто можно найти в Sozialversicherungsausweis, письмах Deutsche Rentenversicherung, зарплатных расчетах, документах работодателя или письмах Krankenkasse."
    },
    de: {
      what: "Die Rentenversicherungsnummer bzw. Sozialversicherungsnummer ist die persönliche Nummer in der deutschen Renten-/Sozialversicherung. Sie dient der eindeutigen Zuordnung in Versicherungs- und Arbeitsunterlagen.",
      where: "Sie steht oft im Sozialversicherungsausweis, in Schreiben der Deutschen Rentenversicherung, in Lohnabrechnungen, Arbeitgeberunterlagen oder Schreiben der Krankenkasse."
    },
    uk: {
      what: "Rentenversicherungsnummer або Sozialversicherungsnummer - персональний номер у німецькій системі пенсійного/соціального страхування. Він потрібен для однозначної ідентифікації у страхових і трудових документах.",
      where: "Його часто можна знайти в Sozialversicherungsausweis, листах Deutsche Rentenversicherung, зарплатних розрахунках, документах роботодавця або листах Krankenkasse."
    }
  },
  steuerId: {
    ru: {
      what: "Steuer-ID - это личный налоговый идентификационный номер в Германии. Обычно состоит из 11 цифр и сохраняется за человеком постоянно.",
      where: "Обычно есть в письме Bundeszentralamt für Steuern, налоговых документах, зарплатных документах, письмах Familienkasse или других письмах ведомств."
    },
    de: {
      what: "Die Steuer-ID ist die persönliche steuerliche Identifikationsnummer in Deutschland. Sie besteht normalerweise aus 11 Ziffern und bleibt dauerhaft einer Person zugeordnet.",
      where: "Sie steht im Schreiben des Bundeszentralamts für Steuern, in Steuerunterlagen, Lohnunterlagen, Schreiben der Familienkasse oder anderen Behördenschreiben."
    },
    uk: {
      what: "Steuer-ID - це особистий податковий ідентифікаційний номер у Німеччині. Зазвичай складається з 11 цифр і постійно закріплений за людиною.",
      where: "Зазвичай є в листі Bundeszentralamt für Steuern, податкових документах, зарплатних документах, листах Familienkasse або інших листах відомств."
    }
  },
  iban: {
    ru: {
      what: "IBAN - международный номер банковского счета. В Германии он обычно начинается с DE и состоит из букв и цифр.",
      where: "Обычно указан в банковском приложении, онлайн-банкинге, выписке со счета, письме банка или на банковской карте."
    },
    de: {
      what: "Die IBAN ist die internationale Kontonummer. In Deutschland beginnt sie meist mit DE und besteht aus Buchstaben und Ziffern.",
      where: "Sie steht meist in der Banking-App, im Online-Banking, auf Kontoauszügen, in Bankschreiben oder auf der Bankkarte."
    },
    uk: {
      what: "IBAN - міжнародний номер банківського рахунку. У Німеччині він зазвичай починається з DE і складається з літер та цифр.",
      where: "Зазвичай вказаний у банківському застосунку, онлайн-банкінгу, виписці з рахунку, листі банку або на банківській картці."
    }
  },
  postfach: {
    ru: {
      what: "Postfachanschrift - это адрес почтового ящика, а не адрес проживания. В Германии он обычно выглядит как Postfach + номер + PLZ и город.",
      where: "Он есть только если почтовый ящик оформлен в Deutsche Post или другом почтовом сервисе. Обычно указан в договоре/подтверждении Postfach или в письмах, где используется этот почтовый адрес."
    },
    de: {
      what: "Die Postfachanschrift ist die Adresse eines Postfachs, nicht die Wohnadresse. Sie besteht meist aus Postfachnummer, PLZ und Ort.",
      where: "Sie existiert nur, wenn ein Postfach bei der Deutschen Post oder einem anderen Postdienst eingerichtet wurde. Sie steht in der Postfach-Bestätigung oder in Schreiben, die an dieses Postfach gehen."
    },
    uk: {
      what: "Postfachanschrift - це адреса поштової скриньки, а не адреса проживання. У Німеччині вона зазвичай виглядає як Postfach + номер + PLZ і місто.",
      where: "Вона є лише якщо поштову скриньку оформлено в Deutsche Post або іншому поштовому сервісі. Зазвичай вказана в підтвердженні Postfach або в листах, які надходять на цю поштову адресу."
    }
  },
  address: {
    ru: {
      what: "Адрес - место, по которому вы зарегистрированы или по которому ведомство может направлять письма. Обычно включает улицу, номер дома, индекс и город.",
      where: "Точный адрес обычно есть в Meldebescheinigung/Anmeldung, договоре аренды, Aufenthaltstitel, письмах Jobcenter или других ведомств."
    },
    de: {
      what: "Die Anschrift ist die Adresse, unter der Sie gemeldet sind oder unter der eine Behörde Sie postalisch erreichen kann. Dazu gehören Straße, Hausnummer, PLZ und Ort.",
      where: "Die genaue Anschrift steht meist in der Meldebescheinigung/Anmeldung, im Mietvertrag, Aufenthaltstitel, in Jobcenter-Schreiben oder anderen Behördenschreiben."
    },
    uk: {
      what: "Адреса - місце, за яким ви зареєстровані або за яким відомство може надсилати листи. Зазвичай включає вулицю, номер будинку, індекс і місто.",
      where: "Точна адреса зазвичай є в Meldebescheinigung/Anmeldung, договорі оренди, Aufenthaltstitel, листах Jobcenter або інших відомств."
    }
  },
  residencePermit: {
    ru: {
      what: "Aufenthaltstitel - документ или электронная карта, подтверждающая право пребывания в Германии.",
      where: "Смотрите пластиковую карту Aufenthaltstitel, Zusatzblatt, Fiktionsbescheinigung или письма Ausländerbehörde."
    },
    de: {
      what: "Der Aufenthaltstitel ist das Dokument oder die elektronische Karte, die den Aufenthaltsstatus in Deutschland nachweist.",
      where: "Prüfen Sie die Aufenthaltstitel-Karte, das Zusatzblatt, die Fiktionsbescheinigung oder Schreiben der Ausländerbehörde."
    },
    uk: {
      what: "Aufenthaltstitel - документ або електронна картка, що підтверджує право перебування в Німеччині.",
      where: "Дивіться пластикову картку Aufenthaltstitel, Zusatzblatt, Fiktionsbescheinigung або листи Ausländerbehörde."
    }
  },
  verpflichtung: {
    ru: {
      what: "Verpflichtungserklärung - официальное обязательство другого человека покрывать расходы на пребывание, например жилье или содержание.",
      where: "Если такой документ был, он обычно выдан Ausländerbehörde и называется Verpflichtungserklärung."
    },
    de: {
      what: "Die Verpflichtungserklärung ist eine offizielle Erklärung, dass eine andere Person Kosten des Aufenthalts übernimmt, zum Beispiel Lebensunterhalt oder Unterkunft.",
      where: "Falls vorhanden, wurde sie meist von der Ausländerbehörde ausgestellt und trägt die Bezeichnung Verpflichtungserklärung."
    },
    uk: {
      what: "Verpflichtungserklärung - офіційне зобов'язання іншої людини покривати витрати на перебування, наприклад житло або утримання.",
      where: "Якщо такий документ був, його зазвичай видала Ausländerbehörde, і він називається Verpflichtungserklärung."
    }
  },
  guardian: {
    ru: {
      what: "Vormund или Betreuer - официальный опекун/представитель, назначенный решением суда или ведомства. Это не просто родственник, который помогает.",
      where: "Подтверждение обычно есть в решении суда, письме Betreuungsgericht, Jugendamt или другом официальном документе о назначении."
    },
    de: {
      what: "Vormund oder Betreuer ist eine offiziell bestellte Vertretung durch Gericht oder Behörde. Gemeint ist nicht nur eine Person, die privat hilft.",
      where: "Nachweise stehen meist im Gerichtsbeschluss, Schreiben des Betreuungsgerichts, Jugendamts oder einem anderen Bestellungsdokument."
    },
    uk: {
      what: "Vormund або Betreuer - офіційний опікун/представник, призначений судом або відомством. Це не просто родич, який допомагає.",
      where: "Підтвердження зазвичай є в рішенні суду, листі Betreuungsgericht, Jugendamt або іншому офіційному документі про призначення."
    }
  },
  familienstand: {
    ru: {
      what: "Familienstand - семейное положение: холост/не замужем, женат/замужем, разведен, вдовец/вдова, зарегистрированное партнерство или постоянное раздельное проживание.",
      where: "Обычно сверяют с документом о браке/разводе, свидетельством о смерти супруга, регистрационными документами или собственными актуальными данными регистрации."
    },
    de: {
      what: "Familienstand bedeutet der aktuelle Personenstand: ledig, verheiratet, geschieden, verwitwet, eingetragene Lebenspartnerschaft oder dauernd getrennt lebend.",
      where: "Angaben lassen sich meist mit Heirats-/Scheidungsunterlagen, Sterbeurkunde des Ehepartners, Registerunterlagen oder aktuellen Meldedaten abgleichen."
    },
    uk: {
      what: "Familienstand - сімейний стан: неодружений/незаміжня, одружений/заміжня, розлучений, вдівець/вдова, зареєстроване партнерство або постійне окреме проживання.",
      where: "Зазвичай звіряють з документом про шлюб/розлучення, свідоцтвом про смерть партнера, реєстраційними документами або актуальними даними реєстрації."
    }
  },
  einreise: {
    ru: {
      what: "Дата въезда - день, когда вы фактически въехали в Германию для текущего пребывания.",
      where: "Ее можно сверить по штампу в паспорте, билету, регистрации/Anmeldung, письмам BAMF/Ausländerbehörde или документам о прибытии."
    },
    de: {
      what: "Das Einreisedatum ist der Tag, an dem Sie für den aktuellen Aufenthalt nach Deutschland eingereist sind.",
      where: "Es lässt sich oft über Passstempel, Ticket, Anmeldung, BAMF-/Ausländerbehörde-Schreiben oder Ankunftsunterlagen nachvollziehen."
    },
    uk: {
      what: "Дата в'їзду - день, коли ви фактично в'їхали до Німеччини для поточного перебування.",
      where: "Її можна звірити за штампом у паспорті, квитком, реєстрацією/Anmeldung, листами BAMF/Ausländerbehörde або документами про прибуття."
    }
  },
  personId: {
    ru: {
      what: "Personenidentifikationsnummer - номер, которым ведомство может обозначать человека в конкретной процедуре. Это не всегда то же самое, что Steuer-ID.",
      where: "Если номер есть, он обычно указан в письмах Jobcenter, Sozialamt, Ausländerbehörde, BAMF или другом Bescheid/Anschreiben."
    },
    de: {
      what: "Die Personenidentifikationsnummer ist eine Nummer, mit der eine Behörde eine Person in einem Verfahren zuordnet. Sie ist nicht immer identisch mit der Steuer-ID.",
      where: "Falls vorhanden, steht sie meist in Schreiben vom Jobcenter, Sozialamt, der Ausländerbehörde, BAMF oder in einem Bescheid/Anschreiben."
    },
    uk: {
      what: "Personenidentifikationsnummer - номер, яким відомство може позначати людину в конкретній процедурі. Це не завжди те саме, що Steuer-ID.",
      where: "Якщо номер є, він зазвичай вказаний у листах Jobcenter, Sozialamt, Ausländerbehörde, BAMF або іншому Bescheid/Anschreiben."
    }
  },
  accountHolder: {
    ru: {
      what: "Kontoinhaber - человек, на чье имя открыт банковский счет.",
      where: "Имя владельца счета видно в банковском приложении, онлайн-банкинге, выписке со счета или документах банка."
    },
    de: {
      what: "Kontoinhaber ist die Person, auf deren Namen das Bankkonto geführt wird.",
      where: "Der Name steht in der Banking-App, im Online-Banking, auf Kontoauszügen oder in Bankunterlagen."
    },
    uk: {
      what: "Kontoinhaber - людина, на чиє ім'я відкритий банківський рахунок.",
      where: "Ім'я власника рахунку видно в банківському застосунку, онлайн-банкінгу, виписці з рахунку або документах банку."
    }
  },
  bankName: {
    ru: {
      what: "Название банка - например Sparkasse, Deutsche Bank, Commerzbank, N26, Volksbank.",
      where: "Обычно видно в банковском приложении, онлайн-банкинге, выписке, договоре счета или на банковской карте."
    },
    de: {
      what: "Name der Bank, zum Beispiel Sparkasse, Deutsche Bank, Commerzbank, N26 oder Volksbank.",
      where: "Er steht meist in der Banking-App, im Online-Banking, auf Kontoauszügen, im Kontovertrag oder auf der Bankkarte."
    },
    uk: {
      what: "Назва банку - наприклад Sparkasse, Deutsche Bank, Commerzbank, N26, Volksbank.",
      where: "Зазвичай видно в банківському застосунку, онлайн-банкінгу, виписці, договорі рахунку або на банківській картці."
    }
  },
  bescheid: {
    ru: {
      what: "Bescheid - официальное письменное решение ведомства. В нем обычно указано, что решено, за какой период и по какому делу.",
      where: "Ищите письмо с заголовком Bescheid от Familienkasse, Jobcenter, Sozialamt, Agentur für Arbeit или другого ведомства."
    },
    de: {
      what: "Ein Bescheid ist eine schriftliche Entscheidung einer Behörde. Darin steht meist, was entschieden wurde, für welchen Zeitraum und zu welchem Vorgang.",
      where: "Suchen Sie nach einem Schreiben mit der Überschrift Bescheid von Familienkasse, Jobcenter, Sozialamt, Agentur für Arbeit oder einer anderen Behörde."
    },
    uk: {
      what: "Bescheid - офіційне письмове рішення відомства. У ньому зазвичай вказано, що вирішено, за який період і щодо якої справи.",
      where: "Шукайте лист із заголовком Bescheid від Familienkasse, Jobcenter, Sozialamt, Agentur für Arbeit або іншого відомства."
    }
  },
  childFormsCount: {
    ru: {
      what: "Anlage Kind - отдельное приложение к заявлению Kindergeld для каждого ребенка.",
      where: "Количество обычно равно числу детей, по которым в этом заявлении нужно заполнить данные. Для каждого ребенка бот создает отдельный блок Anlage Kind."
    },
    de: {
      what: "Anlage Kind ist die separate Anlage zum Kindergeldantrag für jedes Kind.",
      where: "Die Anzahl entspricht meist der Zahl der Kinder, zu denen in diesem Antrag Angaben gemacht werden. Der Bot erstellt für jedes Kind einen eigenen Anlage-Kind-Block."
    },
    uk: {
      what: "Anlage Kind - окремий додаток до заяви Kindergeld для кожної дитини.",
      where: "Кількість зазвичай відповідає числу дітей, щодо яких у цій заяві потрібно внести дані. Для кожної дитини бот створює окремий блок Anlage Kind."
    }
  },
  title: {
    ru: {
      what: "Титул - официальная приставка к имени, например Dr. или Prof. Это не обращение вроде Herr/Frau.",
      where: "Если титул есть, он обычно указан в паспорте, удостоверении, дипломных/профессиональных документах или официальной переписке."
    },
    de: {
      what: "Titel meint einen offiziellen Namenszusatz wie Dr. oder Prof. Gemeint ist nicht die Anrede Herr/Frau.",
      where: "Falls vorhanden, steht er meist im Pass, Ausweis, in akademischen/beruflichen Nachweisen oder offizieller Korrespondenz."
    },
    uk: {
      what: "Титул - офіційна приставка до імені, наприклад Dr. або Prof. Це не звертання Herr/Frau.",
      where: "Якщо титул є, він зазвичай зазначений у паспорті, посвідченні, дипломних/професійних документах або офіційній переписці."
    }
  },
  householdPartner: {
    ru: {
      what: "Haushalt здесь означает общее домашнее хозяйство: люди живут вместе и ведут общий быт. Вопрос касается супруга/партнера или второго родителя ребенка в таком общем домохозяйстве.",
      where: "Ориентиром обычно служит фактическое проживание, регистрация по адресу, договор аренды и семейные документы."
    },
    de: {
      what: "Haushalt bedeutet hier gemeinsamer Haushalt: Personen wohnen zusammen und führen den Alltag gemeinsam. Die Frage betrifft Ehepartner/Partner oder den anderen Elternteil in diesem Haushalt.",
      where: "Anhaltspunkte sind meist tatsächliches Zusammenwohnen, Meldedaten, Mietvertrag und Familienunterlagen."
    },
    uk: {
      what: "Haushalt тут означає спільне домогосподарство: люди живуть разом і ведуть спільний побут. Питання стосується чоловіка/дружини, партнера або другого з батьків у такому домогосподарстві.",
      where: "Орієнтиром зазвичай є фактичне проживання, реєстрація за адресою, договір оренди та сімейні документи."
    }
  },
  relationship: {
    ru: {
      what: "Поле спрашивает родственную связь с ребенком: родной ребенок, усыновленный, приемный, пасынок/падчерица, внук/внучка и т.п.",
      where: "Связь обычно подтверждается свидетельством о рождении, документами об усыновлении/опеке, семейными документами или решением ведомства/суда."
    },
    de: {
      what: "Das Feld fragt nach dem Verwandtschaftsverhältnis zum Kind: leibliches Kind, adoptiertes Kind, Pflegekind, Stiefkind, Enkelkind usw.",
      where: "Das Verhältnis ergibt sich meist aus Geburtsurkunde, Adoptions-/Pflegeunterlagen, Familienunterlagen oder Behörden-/Gerichtsentscheidungen."
    },
    uk: {
      what: "Поле запитує родинний зв'язок із дитиною: рідна дитина, усиновлена, прийомна, пасинок/падчерка, онук/онука тощо.",
      where: "Зв'язок зазвичай підтверджується свідоцтвом про народження, документами про усиновлення/опіку, сімейними документами або рішенням відомства/суду."
    }
  },
  adultChild: {
    ru: {
      what: "Этот блок относится к ребенку от 18 лет. Familienkasse обычно просит уточнить, учится ли ребенок, проходит Ausbildung, ищет место обучения/работу, служит добровольно или находится в переходном периоде.",
      where: "Подтверждения обычно находятся в справке школы/вуза, договоре Ausbildung, Immatrikulationsbescheinigung, письме Agentur für Arbeit, договоре FSJ/BFD или документах работодателя."
    },
    de: {
      what: "Dieser Block betrifft ein Kind ab 18 Jahren. Die Familienkasse fragt meist, ob das Kind Schule/Studium/Ausbildung macht, einen Platz sucht, arbeitssuchend ist, Freiwilligendienst leistet oder in einer Übergangszeit ist.",
      where: "Nachweise stehen meist in Schul-/Studienbescheinigung, Ausbildungsvertrag, Immatrikulationsbescheinigung, Schreiben der Agentur für Arbeit, FSJ/BFD-Vertrag oder Arbeitgeberunterlagen."
    },
    uk: {
      what: "Цей блок стосується дитини від 18 років. Familienkasse зазвичай уточнює, чи дитина навчається, проходить Ausbildung, шукає місце навчання/роботу, проходить добровільну службу або перебуває в перехідному періоді.",
      where: "Підтвердження зазвичай є в довідці школи/вишу, договорі Ausbildung, Immatrikulationsbescheinigung, листі Agentur für Arbeit, договорі FSJ/BFD або документах роботодавця."
    }
  },
  employment: {
    ru: {
      what: "Поле связано с работой по найму, самозанятостью, работодателем, периодом работы или рабочими часами.",
      where: "Данные обычно есть в трудовом договоре, зарплатных расчетах, справке работодателя, Sozialversicherungsmeldung, налоговых документах или Gewerbe/самозанятости."
    },
    de: {
      what: "Das Feld betrifft Beschäftigung, Selbstständigkeit, Arbeitgeber, Arbeitszeitraum oder Wochenstunden.",
      where: "Angaben stehen meist im Arbeitsvertrag, in Lohnabrechnungen, Arbeitgeberbescheinigungen, Sozialversicherungsmeldungen, Steuerunterlagen oder Gewerbe-/Selbstständigkeitsunterlagen."
    },
    uk: {
      what: "Поле пов'язане з роботою за наймом, самозайнятістю, роботодавцем, періодом роботи або робочими годинами.",
      where: "Дані зазвичай є в трудовому договорі, зарплатних розрахунках, довідці роботодавця, Sozialversicherungsmeldung, податкових документах або документах Gewerbe/самозайнятості."
    }
  },
  publicService: {
    ru: {
      what: "Öffentlicher Dienst - работа в государственном/муниципальном секторе: например ведомство, школа, полиция, суд, Bundesagentur für Arbeit, Jobcenter или учреждение федерации/земли/города.",
      where: "Это видно из трудового договора, справки работодателя, названия работодателя или зарплатных документов."
    },
    de: {
      what: "Öffentlicher Dienst bedeutet Arbeit bei Bund, Land, Kommune oder einer öffentlichen Einrichtung, zum Beispiel Behörde, Schule, Polizei, Gericht, Bundesagentur für Arbeit oder Jobcenter.",
      where: "Das ergibt sich aus Arbeitsvertrag, Arbeitgeberbescheinigung, Name des Arbeitgebers oder Lohnunterlagen."
    },
    uk: {
      what: "Öffentlicher Dienst - робота в державному/муніципальному секторі: наприклад відомство, школа, поліція, суд, Bundesagentur für Arbeit, Jobcenter або установа федерації/землі/міста.",
      where: "Це видно з трудового договору, довідки роботодавця, назви роботодавця або зарплатних документів."
    }
  },
  foreignWork: {
    ru: {
      what: "Поле касается работы или выплат, связанных с другой страной: работа за границей, иностранный работодатель, командировка, государственная служба за границей или зарубежные семейные выплаты.",
      where: "Смотрите иностранный трудовой договор, зарплатные документы, командировочные документы, Bescheid/письма иностранного ведомства или документы работодателя."
    },
    de: {
      what: "Das Feld betrifft Arbeit oder Leistungen mit Auslandsbezug: Beschäftigung im Ausland, ausländischer Arbeitgeber, Entsendung, staatliche Tätigkeit im Ausland oder ausländische Familienleistungen.",
      where: "Prüfen Sie ausländische Arbeitsverträge, Lohnunterlagen, Entsendeunterlagen, Bescheide/Schreiben ausländischer Stellen oder Arbeitgeberunterlagen."
    },
    uk: {
      what: "Поле стосується роботи або виплат, пов'язаних з іншою країною: робота за кордоном, іноземний роботодавець, відрядження, державна служба за кордоном або іноземні сімейні виплати.",
      where: "Дивіться іноземний трудовий договір, зарплатні документи, документи про відрядження, Bescheid/листи іноземного відомства або документи роботодавця."
    }
  },
  disability: {
    ru: {
      what: "Behinderung - инвалидность или длительное ограничение здоровья, которое подтверждено официально или медицинскими документами.",
      where: "Подтверждение обычно есть в Schwerbehindertenausweis, Feststellungsbescheid, медицинских справках, письмах Versorgungsamt или других Bescheid."
    },
    de: {
      what: "Behinderung bedeutet eine längerfristige gesundheitliche Einschränkung, die amtlich oder medizinisch nachgewiesen sein kann.",
      where: "Nachweise stehen meist im Schwerbehindertenausweis, Feststellungsbescheid, ärztlichen Unterlagen, Schreiben des Versorgungsamts oder anderen Bescheiden."
    },
    uk: {
      what: "Behinderung - інвалідність або тривале обмеження здоров'я, підтверджене офіційно або медичними документами.",
      where: "Підтвердження зазвичай є в Schwerbehindertenausweis, Feststellungsbescheid, медичних довідках, листах Versorgungsamt або інших Bescheid."
    }
  },
  stationaryFacility: {
    ru: {
      what: "Стационарное учреждение - место, где человек находится не только днем, но и проживает/размещается: больница, реабилитация, Pflegeheim, общежитие учреждения, JVA.",
      where: "Даты и тип учреждения обычно указаны в письме о госпитализации/приеме, справке учреждения, договоре, Bescheid или медицинских документах."
    },
    de: {
      what: "Eine stationäre Einrichtung ist ein Ort, an dem man nicht nur tagsüber ist, sondern untergebracht wird: Krankenhaus, Reha, Pflegeheim, Einrichtung, JVA.",
      where: "Zeiten und Art der Einrichtung stehen meist in Aufnahme-/Entlassungsschreiben, Bescheinigungen der Einrichtung, Verträgen, Bescheiden oder medizinischen Unterlagen."
    },
    uk: {
      what: "Стаціонарна установа - місце, де людина перебуває не лише вдень, а й проживає/розміщується: лікарня, реабілітація, Pflegeheim, установа, JVA.",
      where: "Дати й тип установи зазвичай вказані в листі про прийом/виписку, довідці установи, договорі, Bescheid або медичних документах."
    }
  },
  specialNeed: {
    ru: {
      what: "Особая неизбежная потребность - необычные расходы, которые не относятся к обычным ежемесячным тратам и связаны с конкретной ситуацией.",
      where: "Подтверждения обычно находятся в счетах, назначениях врача, письмах ведомств, договорах, Kostenvoranschlag или других документах по расходу."
    },
    de: {
      what: "Ein unabweisbarer besonderer Bedarf meint außergewöhnliche Kosten, die nicht zu den normalen monatlichen Ausgaben gehören und mit einer konkreten Situation verbunden sind.",
      where: "Nachweise stehen meist in Rechnungen, ärztlichen Bescheinigungen, Behördenschreiben, Verträgen, Kostenvoranschlägen oder anderen Unterlagen zu den Kosten."
    },
    uk: {
      what: "Особлива неминуча потреба - незвичайні витрати, які не належать до звичайних щомісячних витрат і пов'язані з конкретною ситуацією.",
      where: "Підтвердження зазвичай є в рахунках, медичних призначеннях, листах відомств, договорах, Kostenvoranschlag або інших документах щодо витрат."
    }
  },
  birthCountry: {
    ru: {
      what: "Страна рождения - государство, в котором вы родились, не обязательно текущее гражданство.",
      where: "Обычно указана в паспорте, свидетельстве о рождении, Aufenthaltstitel или Meldebescheinigung."
    },
    de: {
      what: "Geburtsland ist der Staat, in dem Sie geboren wurden. Das ist nicht zwingend die aktuelle Staatsangehörigkeit.",
      where: "Es steht meist im Pass, in der Geburtsurkunde, im Aufenthaltstitel oder in der Meldebescheinigung."
    },
    uk: {
      what: "Країна народження - держава, у якій ви народилися, не обов'язково поточне громадянство.",
      where: "Зазвичай вказана в паспорті, свідоцтві про народження, Aufenthaltstitel або Meldebescheinigung."
    }
  },
  applicationDate: {
    ru: {
      what: "Дата заявления - дата, к которой относится подача или подпись этой формы.",
      where: "Обычно это дата подписи на бумажной форме или дата, когда заявление отправляется/передается в ведомство."
    },
    de: {
      what: "Antragsdatum ist das Datum, zu dem der Antrag gestellt oder unterschrieben wird.",
      where: "Meist ist es das Datum der Unterschrift auf dem Formular oder das Datum, an dem der Antrag an die Behörde gesendet/abgegeben wird."
    },
    uk: {
      what: "Дата заяви - дата, до якої належить подання або підпис цієї форми.",
      where: "Зазвичай це дата підпису на паперовій формі або дата, коли заява надсилається/передається до відомства."
    }
  },
  childNumber: {
    ru: {
      what: "Порядковый номер ребенка - технический номер внутри заявления: ребенок 1, ребенок 2 и т.д.",
      where: "Бот ставит этот номер автоматически по порядку заполнения Anlage Kind."
    },
    de: {
      what: "Die laufende Nummer des Kindes ist eine technische Nummer im Antrag: Kind 1, Kind 2 usw.",
      where: "Der Bot setzt diese Nummer automatisch nach der Reihenfolge der Anlage-Kind-Blöcke."
    },
    uk: {
      what: "Порядковий номер дитини - технічний номер у заяві: дитина 1, дитина 2 тощо.",
      where: "Бот ставить цей номер автоматично за порядком заповнення блоків Anlage Kind."
    }
  },
  ageRange: {
    ru: {
      what: "Вопрос относится к возрастной группе. В форме Bürgergeld отдельные правила могут зависеть от того, меньше ли 18 лет или от 18 до 24 лет.",
      where: "Возраст считается по дате рождения в паспорте, Aufenthaltstitel или свидетельстве о рождении."
    },
    de: {
      what: "Die Frage betrifft die Altersgruppe. Im Bürgergeld-Formular können einzelne Angaben davon abhängen, ob jemand unter 18 oder zwischen 18 und 24 Jahre alt ist.",
      where: "Das Alter ergibt sich aus dem Geburtsdatum im Pass, Aufenthaltstitel oder in der Geburtsurkunde."
    },
    uk: {
      what: "Питання стосується вікової групи. У формі Bürgergeld окремі дані можуть залежати від того, чи людині менше 18 років або від 18 до 24 років.",
      where: "Вік визначається за датою народження в паспорті, Aufenthaltstitel або свідоцтві про народження."
    }
  },
  volunteerService: {
    ru: {
      what: "FSJ/BFD или добровольная служба - официальный волонтерский/социальный год или федеральная добровольная служба. Военная служба указывается отдельно, если она была.",
      where: "Данные обычно есть в договоре/справке FSJ/BFD, документах службы, письмах организации или военных документах."
    },
    de: {
      what: "FSJ/BFD oder Freiwilligendienst meint einen offiziellen sozialen/freiwilligen Dienst. Wehrdienst wird gesondert erfasst, wenn er geleistet wurde.",
      where: "Angaben stehen meist im FSJ-/BFD-Vertrag, in Bescheinigungen des Trägers, Schreiben der Organisation oder Wehrdienstunterlagen."
    },
    uk: {
      what: "FSJ/BFD або добровільна служба - офіційний волонтерський/соціальний рік або федеральна добровільна служба. Військова служба зазначається окремо, якщо вона була.",
      where: "Дані зазвичай є в договорі/довідці FSJ/BFD, документах служби, листах організації або військових документах."
    }
  },
  thirdPartyClaims: {
    ru: {
      what: "Требования к третьим лицам - возможные денежные требования к другому человеку, организации или страховке, например компенсация, возмещение ущерба, наследство.",
      where: "Подтверждения обычно есть в письмах страховой, адвоката, суда, нотариуса, полиции, работодателя или другой организации по этому требованию."
    },
    de: {
      what: "Ansprüche gegen Dritte sind mögliche Geldansprüche gegen andere Personen, Organisationen oder Versicherungen, zum Beispiel Entschädigung, Schadensersatz oder Erbschaft.",
      where: "Nachweise stehen meist in Schreiben von Versicherung, Anwalt, Gericht, Notar, Polizei, Arbeitgeber oder einer anderen Stelle zu diesem Anspruch."
    },
    uk: {
      what: "Вимоги до третіх осіб - можливі грошові вимоги до іншої людини, організації або страховки, наприклад компенсація, відшкодування шкоди, спадщина.",
      where: "Підтвердження зазвичай є в листах страхової, адвоката, суду, нотаріуса, поліції, роботодавця або іншої організації щодо цієї вимоги."
    }
  },
  singleParent: {
    ru: {
      what: "Одинокое воспитание означает, что ребенок живет с одним родителем, а второй родитель не проживает в том же домохозяйстве.",
      where: "Обычно смотрят фактический состав домохозяйства, регистрацию по адресу, документы ребенка и сведения о втором родителе."
    },
    de: {
      what: "Alleinerziehend bedeutet, dass das Kind mit einem Elternteil lebt und der andere Elternteil nicht im selben Haushalt wohnt.",
      where: "Anhaltspunkte sind Haushaltszusammensetzung, Meldedaten, Unterlagen zum Kind und Angaben zum anderen Elternteil."
    },
    uk: {
      what: "Самостійне виховання означає, що дитина живе з одним із батьків, а другий з батьків не проживає в тому самому домогосподарстві.",
      where: "Зазвичай дивляться фактичний склад домогосподарства, реєстрацію за адресою, документи дитини та дані про другого з батьків."
    }
  },
  pregnancy: {
    ru: {
      what: "Поле касается беременности и предполагаемой даты родов.",
      where: "Подтверждение обычно есть в Mutterpass, справке врача или документе акушерки/женской консультации."
    },
    de: {
      what: "Das Feld betrifft Schwangerschaft und den voraussichtlichen Entbindungstermin.",
      where: "Nachweise stehen meist im Mutterpass, in einer ärztlichen Bescheinigung oder Unterlagen der Hebamme/Praxis."
    },
    uk: {
      what: "Поле стосується вагітності та очікуваної дати пологів.",
      where: "Підтвердження зазвичай є в Mutterpass, довідці лікаря або документі акушерки/медичного закладу."
    }
  },
  insuranceStatus: {
    ru: {
      what: "Поле спрашивает вид медицинской/уходовой страховки: государственная, частная, добровольная государственная или отсутствие страховки.",
      where: "Статус виден по карте Krankenversicherung, письмам Krankenkasse/частной страховки, договору страхования или последним страховым документам."
    },
    de: {
      what: "Das Feld fragt nach der Art der Kranken-/Pflegeversicherung: gesetzlich, privat, freiwillig gesetzlich oder nicht versichert.",
      where: "Der Status steht auf der Krankenversicherungskarte, in Schreiben der Krankenkasse/privaten Versicherung, im Versicherungsvertrag oder aktuellen Versicherungsunterlagen."
    },
    uk: {
      what: "Поле запитує вид медичного/доглядового страхування: державне, приватне, добровільне державне або відсутність страховки.",
      where: "Статус видно за карткою Krankenversicherung, листами Krankenkasse/приватної страховки, договором страхування або останніми страховими документами."
    }
  },
  householdMembers: {
    ru: {
      what: "Поле касается людей, которые живут вместе с вами в одном жилье или домохозяйстве.",
      where: "Обычно ориентируются на фактическое проживание, Meldebescheinigung, договор аренды и состав семьи/домохозяйства."
    },
    de: {
      what: "Das Feld betrifft Personen, die mit Ihnen in derselben Wohnung oder im selben Haushalt leben.",
      where: "Anhaltspunkte sind tatsächliches Zusammenwohnen, Meldebescheinigung, Mietvertrag und Familien-/Haushaltszusammensetzung."
    },
    uk: {
      what: "Поле стосується людей, які живуть разом із вами в одному житлі або домогосподарстві.",
      where: "Зазвичай орієнтуються на фактичне проживання, Meldebescheinigung, договір оренди та склад сім'ї/домогосподарства."
    }
  },
  warmWater: {
    ru: {
      what: "Децентральная горячая вода означает, что вода нагревается прямо в квартире, например бойлером или проточным нагревателем, а не центральной системой дома.",
      where: "Это видно по оборудованию в квартире, договору аренды, Nebenkostenabrechnung, описанию отопления/воды или счетам за электричество/газ."
    },
    de: {
      what: "Dezentrale Warmwasserbereitung bedeutet, dass Warmwasser direkt in der Wohnung erzeugt wird, zum Beispiel mit Boiler oder Durchlauferhitzer, nicht zentral über das Haus.",
      where: "Hinweise stehen am Gerät in der Wohnung, im Mietvertrag, in der Nebenkostenabrechnung, in Angaben zu Heizung/Warmwasser oder Strom-/Gasrechnungen."
    },
    uk: {
      what: "Децентралізована гаряча вода означає, що вода нагрівається прямо у квартирі, наприклад бойлером або проточним нагрівачем, а не центральною системою будинку.",
      where: "Це видно за обладнанням у квартирі, договором оренди, Nebenkostenabrechnung, описом опалення/води або рахунками за електрику/газ."
    }
  },
  previousName: {
    ru: {
      what: "Прежняя фамилия или фамилия при рождении - фамилия, которая была раньше, например до брака, развода, усыновления или официальной смены имени.",
      where: "Обычно указана в свидетельстве о рождении, свидетельстве о браке/разводе, документе о смене имени, паспорте или Aufenthaltstitel."
    },
    de: {
      what: "Geburtsname oder früherer Name ist der Name, der früher geführt wurde, zum Beispiel vor Ehe, Scheidung, Adoption oder offizieller Namensänderung.",
      where: "Er steht meist in Geburtsurkunde, Heirats-/Scheidungsunterlagen, Namensänderungsurkunde, Pass oder Aufenthaltstitel."
    },
    uk: {
      what: "Попереднє прізвище або прізвище при народженні - прізвище, яке було раніше, наприклад до шлюбу, розлучення, усиновлення або офіційної зміни імені.",
      where: "Зазвичай вказане у свідоцтві про народження, документі про шлюб/розлучення, документі про зміну імені, паспорті або Aufenthaltstitel."
    }
  },
  applicationStart: {
    ru: {
      what: "Поле спрашивает, с какого момента запрашивается Bürgergeld: сразу или с указанной даты.",
      where: "Ориентир обычно берут из даты подачи заявления, текущей ситуации и документов о доходах/расходах за нужный месяц."
    },
    de: {
      what: "Das Feld fragt, ab wann Bürgergeld beantragt wird: sofort oder ab einem bestimmten Datum.",
      where: "Anhaltspunkte sind meist Antragsdatum, aktuelle Situation sowie Unterlagen zu Einkommen/Ausgaben für den betreffenden Monat."
    },
    uk: {
      what: "Поле запитує, з якого моменту запитується Bürgergeld: одразу або з конкретної дати.",
      where: "Орієнтиром зазвичай є дата подання заяви, поточна ситуація та документи про доходи/витрати за потрібний місяць."
    }
  },
  ableToWork: {
    ru: {
      what: "Erwerbsfähig означает способность работать минимум 3 часа в день при обычных условиях рынка труда.",
      where: "Если есть ограничения по здоровью, обычно смотрят медицинские документы, справки врача, Bescheid или документы о реабилитации/инвалидности."
    },
    de: {
      what: "Erwerbsfähig bedeutet, mindestens 3 Stunden täglich unter den üblichen Bedingungen des Arbeitsmarkts arbeiten zu können.",
      where: "Bei gesundheitlichen Einschränkungen sind ärztliche Unterlagen, Bescheinigungen, Bescheide oder Reha-/Behinderungsunterlagen relevant."
    },
    uk: {
      what: "Erwerbsfähig означає здатність працювати щонайменше 3 години на день за звичайних умов ринку праці.",
      where: "Якщо є обмеження за станом здоров'я, зазвичай дивляться медичні документи, довідки лікаря, Bescheid або документи про реабілітацію/інвалідність."
    }
  },
  wageClaims: {
    ru: {
      what: "Невыплаченные зарплатные требования - зарплата или другие выплаты от работодателя, которые относятся к работе, но еще не выплачены.",
      where: "Обычно видно из трудового договора, расчетов зарплаты, переписки с работодателем, Kündigung, судебных/адвокатских писем или документов Insolvenzgeld."
    },
    de: {
      what: "Offene Lohnansprüche sind Arbeitsentgelt oder andere Zahlungen vom Arbeitgeber, die zur Beschäftigung gehören, aber noch nicht gezahlt wurden.",
      where: "Hinweise stehen meist in Arbeitsvertrag, Lohnabrechnungen, Arbeitgeberkorrespondenz, Kündigung, Gerichts-/Anwaltsschreiben oder Insolvenzgeld-Unterlagen."
    },
    uk: {
      what: "Невиплачені зарплатні вимоги - зарплата або інші виплати від роботодавця, які стосуються роботи, але ще не виплачені.",
      where: "Зазвичай видно з трудового договору, розрахунків зарплати, листування з роботодавцем, Kündigung, судових/адвокатських листів або документів Insolvenzgeld."
    }
  },
  careRelatives: {
    ru: {
      what: "Pflege nach SGB XI - уход за человеком, у которого есть признанная потребность в уходе, обычно с Pflegegrad.",
      where: "Подтверждения обычно есть в Bescheid Pflegekasse, письмах Krankenkasse/Pflegekasse, документах о Pflegegrad или справках по уходу."
    },
    de: {
      what: "Pflege nach SGB XI meint Pflege einer Person mit anerkannter Pflegebedürftigkeit, meist mit Pflegegrad.",
      where: "Nachweise stehen meist im Bescheid der Pflegekasse, in Schreiben von Kranken-/Pflegekasse, Pflegegrad-Unterlagen oder Pflegebescheinigungen."
    },
    uk: {
      what: "Pflege nach SGB XI - догляд за людиною з визнаною потребою в догляді, зазвичай із Pflegegrad.",
      where: "Підтвердження зазвичай є в Bescheid Pflegekasse, листах Krankenkasse/Pflegekasse, документах про Pflegegrad або довідках щодо догляду."
    }
  },
  selfSupport: {
    ru: {
      what: "Поле просит описать, за счет чего покрывались расходы на жизнь, если за указанный период не было перечисленных ранее источников.",
      where: "Обычно помогают банковские выписки, подтверждения переводов, документы о сбережениях, письма родственников/знакомых или другие подтверждения источников средств."
    },
    de: {
      what: "Das Feld beschreibt, wovon der Lebensunterhalt gedeckt wurde, wenn für den genannten Zeitraum keine der vorherigen Angaben passt.",
      where: "Hilfreich sind meist Kontoauszüge, Überweisungsnachweise, Sparunterlagen, Schreiben von Angehörigen/Bekannten oder andere Nachweise zur Geldquelle."
    },
    uk: {
      what: "Поле просить описати, за рахунок чого покривалися витрати на життя, якщо за вказаний період не було перелічених раніше джерел.",
      where: "Зазвичай допомагають банківські виписки, підтвердження переказів, документи про заощадження, листи родичів/знайомих або інші підтвердження джерел коштів."
    }
  },
  dueDate: {
    ru: {
      what: "Предполагаемая дата родов - медицински рассчитанный Termin, который обычно указан в документах беременности.",
      where: "Обычно есть в Mutterpass, справке врача, документе Hebamme или письме медицинской практики."
    },
    de: {
      what: "Der voraussichtliche Entbindungstermin ist der medizinisch berechnete Geburtstermin.",
      where: "Er steht meist im Mutterpass, in ärztlicher Bescheinigung, Hebammenunterlagen oder Schreiben der Praxis."
    },
    uk: {
      what: "Очікувана дата пологів - медично розрахований Termin, який зазвичай зазначений у документах вагітності.",
      where: "Зазвичай є в Mutterpass, довідці лікаря, документі Hebamme або листі медичної практики."
    }
  },
  kindergeldHistory: {
    ru: {
      what: "Поле касается предыдущего Kindergeld: подавали ли уже заявление, получали ли выплату, кто получал и за какой период.",
      where: "Данные обычно есть в письмах Familienkasse, Kindergeldbescheid, уведомлениях о выплате, банковских выписках или старых заявлениях."
    },
    de: {
      what: "Das Feld betrifft früheres Kindergeld: ob bereits ein Antrag gestellt wurde, ob Kindergeld gezahlt wurde, wer es erhalten hat und für welchen Zeitraum.",
      where: "Angaben stehen meist in Schreiben der Familienkasse, Kindergeldbescheiden, Zahlungsmitteilungen, Kontoauszügen oder früheren Anträgen."
    },
    uk: {
      what: "Поле стосується попереднього Kindergeld: чи вже подавали заяву, чи отримували виплату, хто отримував і за який період.",
      where: "Дані зазвичай є в листах Familienkasse, Kindergeldbescheid, повідомленнях про виплату, банківських виписках або старих заявах."
    }
  },
  otherPerson: {
    ru: {
      what: "Другая Person - другой человек, данные которого нужны в этом разделе формы, например другой родитель, лицо с родственной связью с ребенком или получатель Bescheid/Kindergeld.",
      where: "Обычно используются паспортные данные, адрес, дата рождения, документы о родстве, письма Familienkasse или другие документы по этому человеку."
    },
    de: {
      what: "Andere Person meint eine weitere Person, zu der in diesem Abschnitt Angaben nötig sind, zum Beispiel anderer Elternteil, verwandte Person, Bescheidempfänger oder Kindergeldempfänger.",
      where: "Angaben ergeben sich meist aus Ausweisdaten, Anschrift, Geburtsdatum, Verwandtschaftsnachweisen, Familienkasse-Schreiben oder Unterlagen zu dieser Person."
    },
    uk: {
      what: "Інша Person - інша людина, дані якої потрібні в цьому розділі форми, наприклад другий з батьків, особа з родинним зв'язком із дитиною або отримувач Bescheid/Kindergeld.",
      where: "Зазвичай використовуються паспортні дані, адреса, дата народження, документи про родинний зв'язок, листи Familienkasse або інші документи щодо цієї людини."
    }
  },
  bic: {
    ru: {
      what: "BIC - банковский код для международной идентификации банка. Он нужен не для каждого немецкого платежа, но иногда запрашивается в форме.",
      where: "Его можно найти в банковском приложении, онлайн-банкинге, выписке, письме банка или на сайте банка."
    },
    de: {
      what: "Der BIC ist ein Bankcode zur internationalen Identifikation der Bank. Er wird nicht für jede deutsche Zahlung benötigt, wird aber manchmal im Formular abgefragt.",
      where: "Sie finden ihn in der Banking-App, im Online-Banking, auf Kontoauszügen, in Bankschreiben oder auf der Website der Bank."
    },
    uk: {
      what: "BIC - банківський код для міжнародної ідентифікації банку. Він потрібен не для кожного німецького платежу, але іноді запитується у формі.",
      where: "Його можна знайти в банківському застосунку, онлайн-банкінгу, виписці, листі банку або на сайті банку."
    }
  },
  kindergeldNumber: {
    ru: {
      what: "Kindergeldnummer - номер дела/выплаты в Familienkasse. Он появляется, если по ребенку или семье уже было обращение по Kindergeld.",
      where: "Обычно указан в письмах Familienkasse, Bescheid, уведомлениях о выплате или предыдущих заявлениях."
    },
    de: {
      what: "Die Kindergeldnummer ist die Vorgangs- bzw. Zahlungsnummer bei der Familienkasse. Sie erscheint, wenn es zu einem Kind oder zur Familie bereits Kindergeldkontakt gab.",
      where: "Sie steht meist in Schreiben der Familienkasse, im Bescheid, in Zahlungsmitteilungen oder in früheren Anträgen."
    },
    uk: {
      what: "Kindergeldnummer - номер справи/виплати у Familienkasse. Він з'являється, якщо щодо дитини або сім'ї вже було звернення по Kindergeld.",
      where: "Зазвичай вказаний у листах Familienkasse, Bescheid, повідомленнях про виплату або попередніх заявах."
    }
  },
  azr: {
    ru: {
      what: "AZR-Nummer - номер в Ausländerzentralregister, центральном реестре иностранцев в Германии.",
      where: "Может быть указан в документах Ausländerbehörde, Aufenthaltstitel, письмах BAMF или других документах по пребыванию."
    },
    de: {
      what: "Die AZR-Nummer ist die Nummer im Ausländerzentralregister, dem zentralen Register für ausländische Personen in Deutschland.",
      where: "Sie kann in Unterlagen der Ausländerbehörde, im Aufenthaltstitel, in BAMF-Schreiben oder anderen Aufenthaltsunterlagen stehen."
    },
    uk: {
      what: "AZR-Nummer - номер в Ausländerzentralregister, центральному реєстрі іноземців у Німеччині.",
      where: "Може бути зазначений у документах Ausländerbehörde, Aufenthaltstitel, листах BAMF або інших документах щодо перебування."
    }
  },
  healthInsurance: {
    ru: {
      what: "Krankenkasse - медицинская страховая касса. Поле обычно спрашивает название кассы или страховой номер.",
      where: "Название и номер часто есть на карте Krankenversicherung, в приложении страховки, письмах Krankenkasse или страховых документах."
    },
    de: {
      what: "Die Krankenkasse ist die gesetzliche Krankenversicherung. Das Feld fragt meist nach dem Namen der Kasse oder der Versichertennummer.",
      where: "Name und Nummer stehen oft auf der Krankenversicherungskarte, in der App, in Schreiben der Krankenkasse oder Versicherungsunterlagen."
    },
    uk: {
      what: "Krankenkasse - медична страхова каса. Поле зазвичай запитує назву каси або страховий номер.",
      where: "Назва і номер часто є на картці Krankenversicherung, у застосунку страховки, листах Krankenkasse або страхових документах."
    }
  },
  benefits: {
    ru: {
      what: "Здесь речь о пособиях, выплатах или решениях ведомств за указанный период.",
      where: "Смотрите Bescheid, письма или уведомления Jobcenter, Sozialamt, Familienkasse, Agentur für Arbeit, Krankenkasse или другого ведомства."
    },
    de: {
      what: "Hier geht es um Leistungen, Zahlungen oder Behördenentscheidungen für den genannten Zeitraum.",
      where: "Prüfen Sie Bescheide, Schreiben oder Mitteilungen vom Jobcenter, Sozialamt, der Familienkasse, Agentur für Arbeit, Krankenkasse oder einer anderen Stelle."
    },
    uk: {
      what: "Тут йдеться про допомоги, виплати або рішення відомств за вказаний період.",
      where: "Перевірте Bescheid, листи або повідомлення Jobcenter, Sozialamt, Familienkasse, Agentur für Arbeit, Krankenkasse або іншого відомства."
    }
  },
  housing: {
    ru: {
      what: "Поле связано с жильем, арендой, отоплением или коммунальными расходами.",
      where: "Обычно данные есть в договоре аренды, Nebenkostenabrechnung, письмах арендодателя или счетах поставщиков коммунальных услуг."
    },
    de: {
      what: "Das Feld bezieht sich auf Wohnung, Miete, Heizung oder Nebenkosten.",
      where: "Angaben stehen meist im Mietvertrag, in der Nebenkostenabrechnung, in Schreiben des Vermieters oder Rechnungen von Versorgern."
    },
    uk: {
      what: "Поле пов'язане з житлом, орендою, опаленням або комунальними витратами.",
      where: "Зазвичай дані є в договорі оренди, Nebenkostenabrechnung, листах орендодавця або рахунках постачальників комунальних послуг."
    }
  },
  education: {
    ru: {
      what: "Поле связано со школой, учебой, Ausbildung, университетом или другим видом обучения.",
      where: "Сведения обычно есть в справке школы/вуза, договоре Ausbildung, Immatrikulationsbescheinigung или письме учебного заведения."
    },
    de: {
      what: "Das Feld bezieht sich auf Schule, Studium, Ausbildung oder eine andere Bildungsmaßnahme.",
      where: "Angaben stehen meist in Schul-/Ausbildungsbescheinigungen, Ausbildungsverträgen, Immatrikulationsbescheinigungen oder Schreiben der Einrichtung."
    },
    uk: {
      what: "Поле пов'язане зі школою, навчанням, Ausbildung, університетом або іншим видом навчання.",
      where: "Відомості зазвичай є в довідці школи/вишу, договорі Ausbildung, Immatrikulationsbescheinigung або листі навчального закладу."
    }
  }
};

const DETAIL_RULES = [
  ["postfach", ["postfach"]],
  ["residencePermit", ["aufenthaltstitel", "residence_permit"]],
  ["verpflichtung", ["verpflichtung"]],
  ["guardian", ["guardian", "vormund", "betreuer", "опекун", "опікун"]],
  ["familienstand", ["familienstand", "marital_status", "семейное положение", "сімейний стан"]],
  ["einreise", ["einreise", "въезд", "в'їзд"]],
  ["personId", ["personidnumber", "person_id", "personenidentifikationsnummer"]],
  ["accountHolder", ["kontoinhaber", "account_holder"]],
  ["bankName", ["bank_name", "название банка", "назва банку"]],
  ["bescheid", ["bescheid", "notice_recipient"]],
  ["childFormsCount", ["attached_child_forms_count"]],
  ["title", ["title", "титул"]],
  ["householdPartner", ["partner_exists", "haushalt"]],
  ["relationship", ["relationship", "родстве", "родства", "родин"]],
  ["adultChild", ["adult_child", "ребёнок 18", "дитина 18"]],
  ["publicService", ["public_service", "öffentlichen dienst", "oeffentlichen dienst"]],
  ["foreignWork", ["foreign_", "posted_worker", "за границей", "за кордоном"]],
  ["employment", ["employed", "employment", "employer", "selfemployed", "self_employed", "beschäftigung", "работ", "робот", "занятость", "зайнятість"]],
  ["disability", ["disability", "behinderung", "инвалид", "інвалід"]],
  ["stationaryFacility", ["stationary", "стационар", "стаціонар", "krankenhaus", "pflegeheim", "jva"]],
  ["specialNeed", ["special", "unavoidable", "bedarf", "diet", "ernährung", "потреб", "диета", "дієта"]],
  ["birthCountry", ["geburtsland", "birth_country", "страна рождения", "країна народження"]],
  ["applicationDate", ["application_date", "antrag_date", "дата заявления", "дата заяви"]],
  ["childNumber", ["ank_child_number"]],
  ["ageRange", ["under18", "18to24", "soon_18", "adult_or_soon", "18 до 24"]],
  ["volunteerService", ["volunteer", "military", "fsj", "bfd", "военную службу", "добровольную", "військов", "добровільн"]],
  ["thirdPartyClaims", ["claimsagainst", "thirdpart", "третьим лиц", "третіх осіб"]],
  ["singleParent", ["singleparent", "allein", "один", "одна"]],
  ["pregnancy", ["pregnant", "pregnancy", "беремен", "вагіт"]],
  ["insuranceStatus", ["statutoryinsured", "privately", "voluntary", "uninsured", "gesetzlich", "pflegeversicherung", "застрахованы", "застраховані"]],
  ["householdMembers", ["lives_alone", "lives_with_people", "проживаете", "живёте", "живете"]],
  ["warmWater", ["warmwater", "warmwasser", "бойлер", "проточный", "проточний"]],
  ["previousName", ["geburtsname", "previous_name", "birth_name", "прежн", "попередн"]],
  ["applicationStart", ["antrag_ab"]],
  ["ableToWork", ["isabletowork", "erwerbsfähig", "erwerbsfaehig", "трудоспособ", "працездат"]],
  ["wageClaims", ["unpaidwage", "wageclaims", "lohnanspruch", "зарплатн"]],
  ["careRelatives", ["caredfor", "pflege nach", "ухаживали", "доглядали"]],
  ["selfSupport", ["howsupported", "lebensunterhalt", "обеспечивали", "забезпечували"]],
  ["dueDate", ["duedate", "entbindung", "родов", "полог"]],
  ["kindergeldHistory", ["already_receives_kindergeld", "other_person_receives_kindergeld", "already_applied_or_received", "previous_kindergeld", "receiver_name"]],
  ["otherPerson", ["other_person", "другая person", "інша person"]],
  ["address", ["anschrift", "address", "adresse", "strasse", "straße", "hausnummer", "plz", "wohnort", "адрес", "вулиц", "місто"]],
  ["rentenversicherung", ["rentenversicherung", "sozialversicherung"]],
  ["steuerId", ["steuer", "tax id", "tax_id", "identifikation"]],
  ["kindergeldNumber", ["kindergeld_number", "kindergeldnummer", "familienkasse_number"]],
  ["iban", ["iban"]],
  ["bic", ["bic"]],
  ["azr", ["azr"]],
  ["healthInsurance", ["krankenkasse", "healthinsurance", "health_insurance", "krankenversicherung"]],
  ["benefits", ["benefit", "leistung", "asylum", "wohngeld", "bafoeg", "bafög", "sozialhilfe", "pособ", "виплат"]],
  ["housing", ["miete", "housing", "heating", "unterkunft", "wohnung", "warmwasser", "жиль", "житл", "опален"]],
  ["education", ["school", "schule", "studium", "training", "ausbildung", "учеб", "навч"]]
];

const SIMPLE_RULES = [
  ["firstName", ["first_name", "vorname", "имя", "ім'я"]],
  ["lastName", ["last_name", "nachname", "surname", "фамил", "прізв"]],
  ["birthDate", ["birth_date", "geburtsdatum", "дата рождения", "дата народження"]],
  ["birthPlace", ["birth_place", "geburtsort", "место рождения", "місце народження"]],
  ["nationality", ["nationality", "staatsangehoerigkeit", "staatsangehörigkeit", "гражданство", "громадянство"]],
  ["gender", ["gender", "geschlecht", "пол", "стать"]],
  ["phone", ["phone", "telefon", "телефон"]],
  ["email", ["email", "e-mail", "почта", "пошта"]],
  ["signatureDate", ["signature_date", "unterschrift", "дата подписи", "дата підпису"]]
];

function normalizeLanguage(language) {
  return SUPPORTED_FORM_LANGUAGES.includes(language) ? language : "ru";
}

function normalizeLabel(label, field) {
  return String(label || field?.label_ru || field?.label || field?.key || "")
    .replace(/:$/, "")
    .trim();
}

function getSearchText(field, label) {
  return [
    field?.key,
    field?.originalKey,
    field?.sectionKey,
    field?.repeatGroup,
    label
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function findRule(rules, searchText) {
  return rules.find(([, terms]) => terms.some((term) => searchText.includes(term)))?.[0];
}

function getGenericWhat(field, language, label) {
  const texts = TEXTS[language];

  if (field?.type === "date") return texts.date(label);
  if (field?.type === "choice") return texts.choice(label);
  if (field?.type === "multi_choice") return texts.multiChoice(label);
  if (field?.type === "boxed_text") return texts.boxed(label);
  return texts.defaultWhat(label);
}

export function buildGenericFieldHelp(field, language, label) {
  const normalizedLanguage = normalizeLanguage(language);
  const texts = TEXTS[normalizedLanguage];
  const normalizedLabel = normalizeLabel(label, field);
  const searchText = getSearchText(field, normalizedLabel);

  const simpleKey = findRule(SIMPLE_RULES, searchText);
  if (simpleKey) return texts.simple[simpleKey];

  const detailKey = findRule(DETAIL_RULES, searchText);
  if (detailKey) {
    const detail = DETAILED_HINTS[detailKey][normalizedLanguage];
    return `${texts.what}\n${detail.what}\n\n${texts.where}\n${detail.where}`;
  }

  return `${texts.what}\n${getGenericWhat(field, normalizedLanguage, normalizedLabel)}\n\n${texts.where}\n${texts.defaultWhere}`;
}
