export class MenuItem {
  Id = 0;
  IdMenu = 0;
  IdProduct = 0;
  Menu = new Menu();
}

export class Menu {
  Id = 0;
  Active = false;
  Title = '';
  Description = '';
  ImageURL = '';
  ImageBase64 = '';
  BadgeDescription = '';
  BadgeColor = '';
  MenuItem = new Array<MenuItem>();
}
