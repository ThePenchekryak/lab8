class Employee {
  constructor(name, surname, baseSalary, experience) {
    this.name = name;
    this.surname = surname;
    this.baseSalary = baseSalary;
    this.experience = experience;
  }
  countedSalary() {
    if (this.experience > 2 && this.experience < 5) {
      return this.baseSalary + 200;
    }
    if (this.experience >= 5) {
      return this.baseSalary * 1.2 + 500;
    }
    return this.baseSalary;
  }
}

class Developer extends Employee {
  constructor(name, surname, baseSalary, experience) {
    super(name, surname, baseSalary, experience);
  }
}

class Designer extends Employee {
  constructor(name, surname, baseSalary, experience, effCoeff) {
    super(name, surname, baseSalary, experience);
    this.effCoeff = effCoeff;
  }
  countedSalary() {
    return Math.round(super.countedSalary() * this.effCoeff);
  }
}

class Manager extends Employee {
  constructor(name, surname, baseSalary, experience, team) {
    super(name, surname, baseSalary, experience);
    this.team = team;
  }
  countedSalary() {
    let salary = super.countedSalary();
    if (this.team.length > 5 && this.team.length < 10) {
      salary += 200;
    }
    if (this.team.length >= 10) {
      salary += 300;
    }
    if (
      this.team.filter(teammate => teammate.constructor.name == 'Developer').length >
      this.team.length / 2
    )
      salary *= 1.1;
    return Math.round(salary);
  }
}

class Department {
  constructor(managers) {
    this.managers = managers;
  }
  giveSalary() {
    for (let manager of this.managers) {
      console.log(`${manager.name} ${manager.surname} отримав ${manager.countedSalary()} шекєлей`);
      for (let teammate of manager.team) {
        console.log(
          `${teammate.name} ${teammate.surname} отримав ${teammate.countedSalary()} шекєлей`
        );
      }
    }
  }
}

const Team1Designer1 = new Designer('Максим', 'Дністрянський', 2050, 3, 0.3);
const Team1Designer2 = new Designer('Олександр', 'Стрижак', 2350, 5, 0.5);
const Team1Developer1 = new Developer('Сергій', 'Шапошніков', 3000, 1.5);
const Team1Developer2 = new Developer('Владислав', 'Голобородько', 3300, 2);
const Team1Manager = new Manager('Джон', 'Гант', 4000, 2, [
  Team1Designer1,
  Team1Designer2,
  Team1Developer2,
  Team1Developer2,
]);

const Team2Designer1 = new Designer('Ольга', 'Кононенко', 1200, 0.5, 0.2);
const Team2Designer2 = new Designer('Ігор', 'Пономаренко', 1900, 6, 0.7);
const Team2Developer1 = new Developer('Іван', 'Войтюк', 1700, 4);
const Team2Developer2 = new Developer('Дмитро', 'Кафтан', 2500, 8);
const Team2Manager = new Manager('Марина', 'Портман', 4450, 4, [
  Team2Designer1,
  Team2Designer2,
  Team2Developer1,
  Team1Developer2,
]);

const Team3Designer1 = new Designer('Всеволод', 'Бекхем', 3000, 9, 1.7);
const Team3Developer1 = new Developer('Ірина', 'Боднарчук', 4000, 3);
const Team3Manager = new Manager('Катерина', 'Жакун', 5550, 5, [Team3Designer1, Team3Developer1]);

const department = new Department([Team1Manager, Team2Manager, Team3Manager]);

department.giveSalary();
