
<template>
  <div>
    <el-page-header @back="goBack" content="Your books" title="logout" class="bg">
    </el-page-header>
    <BooksTable />
  </div>
</template>

<script>
import BooksTable from "../components/BooksTable";
export default {
  name: "books",
  components: {
    BooksTable
  },
    methods: {
      goBack() {
        this.$store.dispatch("auth/logout")
        this.$router.push("/login")
      },
    }
  }
</script>


<style>
.bg {
  background-color: rgb(0, 124, 137);
  color: white;
}
</style>