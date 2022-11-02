import { fakeData } from "./fakeData";
import { beautifyText, getTodos, saveTodos } from "./utils";

describe("Тестируем функции-хелперы", () => {
  it("Сохранение списка дел", () => {
    saveTodos(fakeData)
    expect(getTodos())
    .toEqual(fakeData);
  })
  it('Форматирование текста', () => {
    expect(beautifyText("  интеграционные тесты    "))
    .toEqual("Интеграционные тесты;")
  });

})