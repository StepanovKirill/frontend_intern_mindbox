import {beautifyText, getTodos, saveTodos} from '../../src/utils/utils';
import {fakeData} from '../../src/utils/fakeData';

const url = "http://localhost:3000";

describe('Тестируем todos-mindbox test app', () => {
  it('Проверяем подключение к серверу', () => {
    cy.visit(url)
  })

  it('Добавляем новые задачи', () => {
    fakeData.forEach((item) => cy.get('[data-test="input-todo"]').type(`${item.text}{enter}`))
  })

  it('Проверяем корректность добавления', () => {
    cy.get('[data-test="todo-list"] li').should('have.length', 3)
    cy.get('[data-test="remaining-counter"]').contains('3')
    cy.get('[data-test="todo-list"] li').first().should('have.text', beautifyText(fakeData[2].text));
    cy.get('[data-test="todo-list"] li').last().should('have.text', beautifyText(fakeData[0].text));
    
    cy.get('[data-test="input-todo"]').type(`${'   интеграционные тесты   '}{enter}`)

    cy.get('[data-test="remaining-counter"]').contains('4')

    cy.get('[data-test="todo-list"] li')
      .should('have.length', 4)
      .first()
      .should('contain.text', 'Интеграционные тесты;')
  })

  it('Проверяем выделение выполненной задачи', () => {

    cy.contains('Интеграционные тесты;')
      .parent('li')
      .find('[data-test="done-button"]')
      .click()

    cy.contains('Интеграционные тесты;')
      .invoke('attr', 'class').should('contain', 'doneText')
    
    cy.contains('Интеграционные тесты;')
      .parent('li')
      .find('[data-test="done-button"]')
      .invoke('attr', 'class').should('contain', 'doneButton')
  })

  it('Проверяем табы', () => {
      // только активные
      cy.contains('Активные').click()

      cy.get('[data-test="todo-list"] li')
        .should('have.length', 3)
        .first()
        .should('have.text', 'Сверстать макет;')

      cy.contains('Интеграционные тесты;').should('not.exist')

      cy.get('[data-test="remaining-counter"]').contains('3')

      // только выполненные
      cy.contains('Выполненные').click()

      cy.get('[data-test="todo-list"] li')
        .should('have.length', 1)
        .first()
        .should('contain.text', 'Интеграционные тесты;')

      cy.contains('Интеграционные тесты;').should('exist')
      cy.contains('Свестать макет;').should('not.exist')

    })

    it('Проверка удаления всех выполненных задач', () => {
      cy.get('[data-test="tabs"]').contains('Все').click();

      cy.get('[data-test="todo-list"] li')
        .should('have.length', 4)
        .first()
        .should('contain.text', 'Интеграционные тесты;')
      
      cy.get('[data-test="todo-list"] li')
        .contains('Интеграционные тесты;')
        .parent('li')
        .find('[data-test="delete-button"]')
        .click()
      cy.contains('Удалить выполненные').click()

      cy.contains('Интеграционные тесты;').should('not.exist')

      // только активные
      cy.contains('Активные').click()

      cy.get('[data-test="todo-list"] li')
        .should('have.length', 3)
        .first()
        .should('contain.text', 'Сверстать макет;')

      cy.contains('Интеграционные тесты;').should('not.exist')

      // только выполненные   
      cy.contains('Выполненные').click()

      cy.get('[data-test="todo-list"] li')
        .should('have.length', 0)

      cy.contains('Интеграционные тесты;').should('not.exist')

      cy.get('[data-test="remaining-counter"]').contains('3')

      cy.contains('Все').click()
    })    
  })

