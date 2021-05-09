<template>
  <div>
    <div class="field">
      <el-button @click="dialogNew = true" style="margin: 10px">New Book</el-button>
    </div>
    <el-col :span="8" v-for="(book, index) in tableData" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="book.image.image" class="image" style="max-height: 100px">
        <div style="padding: 14px;">
          <p>Title: {{ book.title }}</p>
          <p>Author: {{ book.author }}</p>
          <p>Description: {{ book.description }}</p>
          <div class="bottom clearfix">
            <el-button class="button" @click="openEditDialog(index)">Edit</el-button>
            <el-button class="button" @click="deleteBook(book.id)">Delete</el-button>
          </div>
        </div>
      </el-card>
    </el-col>

    <el-dialog title="Book" :visible.sync="dialogEdit">
      <BookForm :book="tableData[selected]" @cancel="cancel" @confirm="confirm"></BookForm>
    </el-dialog>
    <el-dialog title="Book" :visible.sync="dialogNew">
      <BookForm :book="tableData[selected]" @cancel="cancel" @confirm="confirm"></BookForm>
    </el-dialog>


  </div>
</template>

<script>
import BookForm from "./BookForm";

export default {
  components: {
    BookForm
  },
  data() {
    return {
      tableData: [],
      dialogEdit: false,
      dialogNew: false,
      selected: null,
      oldData: null
    }
  },
  methods: {
    openEditDialog(pos) {
      this.selected = pos
      this.oldData = {...this.tableData[pos]}
      this.dialogEdit = true
    },
    async fetchBooks() {
      let res = await this.$http.get("books/book")
      this.tableData = res.data
    },
    cancel() {
      this.tableData[this.selected] = this.oldData
      this.dialogEdit = false
      this.dialogNew = false
      this.selected = null
    },
    async confirm(data) {
      if (Object.prototype.hasOwnProperty.call(data, "id")) {
        await this.$http.patch(`books/book/${data['id']}/`, {...data, image_id: data.image.id})
        this.$message.success("Successfully edited")
        this.dialogEdit = false
        this.selected = null
      } else {
        let resp = await this.$http.post("books/book/", {...data, image_id: data.image.id})
        this.tableData = [resp.data, ...this.tableData]
        this.dialogNew = false
        this.$message.success("Successfully added")
      }
    },
    async deleteBook(id) {
      await this.$http.delete(`books/book/${id}/`)
      this.tableData = this.tableData.filter(e=>e.id != id)
      this.$message.success("Successfully deleted")
    }
  },
  mounted() {
    this.fetchBooks()
  }
}
</script>