function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      playerMana: 0,
      currentRound: 0,
      startRemainingRounds: 12,
      moveSwordRight: false,
      moveFlameRight: false,
      moveClawLeft: false,
      healUsed: false,

      winner: null,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    playerManaBarStyles() {
      if (this.playerMana > 100) {
        this.playerMana = 100;
      }
      return { width: this.playerMana + "%" };
    },
    mayUseSpecialAttack() {
      return this.playerMana >= 60;
    },
    mayUseHeal() {
      return this.playerMana >= 40;
    },
    remainingRounds() {
      remainingRounds = this.startRemainingRounds - this.currentRound;
      return remainingRounds;
    },
  },
  watch: {
    playerHealth() {
      if (this.playerHealth < 0 && this.monsterHealth < 0) {
        this.winner = "draw";
      }
      if (this.playerHealth <= 0) {
        this.winner = "monster";
      }
    },
    remainingRounds() {
      if (this.remainingRounds == 0) {
        alert("Time ran out !");
      }
    },
    monsterHealth() {
      if (this.monsterHealth <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
    },
    attackMonster() {
      this.currentRound++;
      this.playerMana += 35;
      const attackValue = getRandomValue(10, 20);
      this.swordMovement();
      setTimeout(() => {
        this.monsterHealth -= attackValue;
      }, 1000);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 12);
      setTimeout(() => {
        this.playerHealth -= attackValue;
      }, 800);

      this.clawMovement();
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(15, 20);
      this.playerMana -= 60;
      this.flameMovement();
      this.attackPlayer();
      setTimeout(() => {
        this.monsterHealth -= attackValue;
      }, 1000);
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(15, 20);
      this.useHeal();
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
    },
    surrenderGame() {
      this.playerHealth = 0;
    },
    swordMovement() {
      this.moveSwordRight = true;
      setTimeout(() => {
        this.moveSwordRight = false;
      }, 700);
    },
    flameMovement() {
      this.moveFlameRight = true;
      setTimeout(() => {
        this.moveFlameRight = false;
      }, 700);
    },
    clawMovement() {
      this.moveClawLeft = true;
      setTimeout(() => {
        this.moveClawLeft = false;
      }, 700);
    },
    useHeal() {
      this.healUsed = true;
      this.playerMana -= 40;
      setTimeout(() => {
        this.healUsed = false;
      }, 1500);
    },
  },
});

app.mount("#game");
