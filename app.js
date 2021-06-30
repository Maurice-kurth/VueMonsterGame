function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      showRemainingRounds: 9,
      moveSwordRight: false,
      moveFlameRight: false,
      moveClawLeft: false,
      healUsed: false,
      gcd: false,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    remainingRounds() {
      remainingRounds = this.showRemainingRounds - this.currentRound;
      return remainingRounds;
    },
  },
  watch: {
    playerHealth() {
      if (this.playerHealth && this.monsterHealth < 0) {
        alert("It's a draw ! ");
      }
      if (this.playerHealth <= 0) {
        alert("You lost !");
      }
    },
    remainingRounds() {
      if (this.remainingRounds == 0) {
        alert("Time ran out !");
      }
    },
    monsterHealth() {
      if (this.monsterHealth <= 0) {
        alert("You won !");
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;

      const attackValue = getRandomValue(5, 12);
      this.swordMovement();
      setTimeout(() => {
        this.monsterHealth -= attackValue;
      }, 1000);

      setTimeout(() => {
        this.attackPlayer();
      }, 1500);
      this.gcd = true;
      setTimeout(() => {
        this.gcd = false;
      }, 1500);
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      setTimeout(() => {
        this.playerHealth -= attackValue;
      }, 800);

      this.clawMovement();
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(15, 20);
      this.flameMovement();
      setTimeout(() => {
        this.monsterHealth -= attackValue;
      }, 1000);

      setTimeout(() => {
        this.attackPlayer();
      }, 1500);

      this.gcd = true;
      setTimeout(() => {
        this.gcd = false;
      }, 1500);
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);

      this.useHeal();
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.gcd = true;
      setTimeout(() => {
        this.gcd = false;
      }, 1500);
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
      setTimeout(() => {
        this.healUsed = false;
      }, 1500);
    },
  },
});

app.mount("#game");
