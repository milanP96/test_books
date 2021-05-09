<template>
  <div class="login">
    <el-card>
      <h2>{{ mode }}</h2>
      <el-form
          class="login-form"
          :model="user"
          ref="form"
          @submit.native.prevent="login"
      >
        <el-form-item prop="first_name" v-if="mode != 'Login'">
          <el-input v-model="user.first_name" placeholder="first name" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="last_name" v-if="mode != 'Login'">
          <el-input v-model="user.last_name" placeholder="last name" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="user.email" placeholder="email" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="user.password"
              placeholder="Password"
              type="password"
              prefix-icon="fas fa-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              native-type="submit"
              block
          >{{ mode }}
          </el-button>
        </el-form-item>
      </el-form>
      <router-link
          :to="mode == 'Login' ? '/sign_up' : 'login'"
          href="https://oxfordinformatics.com/">
        {{ mode == "Login" ? "You do not have account?" : "Login" }}
      </router-link>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "auth",
  props: ["mode"],
  data() {
    return {
      user: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      },
      loading: false,
    };
  },
  methods: {
    async login() {
      this.loading = true;
      if (this.mode == "Login") {

        try {
          let resp = await this.$store.dispatch('auth/Login', {email: this.user.email, password: this.user.password})
          if (resp) {
            this.$router.push("/")
          } else {
            this.$message.error("Bad credentials")
          }

        } catch (e) {
          this.$message.error("Bad credentials")
        }

      } else {
        try {
          await this.$http.post("user/", this.user)
          this.$message.success("Success. Now you can login.")
          this.$router.push("/login")
        } catch (e) {
          this.$message.error("Bad info")
        }
      }


      this.loading = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}

.login-form {
  width: 290px;
}

.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}

.login .el-input__inner:hover {
  border-color: $teal;
}

.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;

  .el-input__icon {
    width: 30px;
  }
}

.login .el-input input {
  padding-left: 35px;
}

.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}

h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}

a {
  color: $teal;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}

.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
