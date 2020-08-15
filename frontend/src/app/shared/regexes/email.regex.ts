export class EmailRegex {
  public static Regex:
    RegExp = /^(?!.*?\.\.)[a-zA-Z0-9+-]+[\w-\.\+]+[a-zA-Z0-9+-]@(([a-zA-Z0-9]*[a-zA-Z0-9-]+[a-zA-Z0-9]{1,})+\.)+((?=.*[a-zA-Z])[a-zA-Z0-9]*[a-zA-Z0-9-]+[a-zA-Z0-9]{1,})$/;

}
