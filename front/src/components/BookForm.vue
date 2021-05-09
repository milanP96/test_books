<template>
  <div>
    <img :src="book.image.image" class="image" style="max-height: 100px">
    <el-input placeholder="Title" v-model="book.title" class="field"></el-input>
    <el-input placeholder="Author" v-model="book.author" class="field"></el-input>
    <el-input placeholder="Description" v-model="book.description" class="field"></el-input>
    <div class="field">
      <el-button @click="startUpload">Upload image</el-button>
    </div>
    <input type="file" ref="input" @change="uploadImage" style="display: none"/>
    <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('cancel')">Cancel</el-button>
    <el-button type="primary" @click="confirm">Confirm</el-button>
  </span></div>
</template>

<script>
export default {
  name: "BookForm",
  props: {
    book: {
      type: Object,
      default: function () {
        return {
          title: "",
          description: "",
          author: "",
          image: ""
        }
      }
    }
  },
  methods: {
    startUpload() {
      this.$refs.input.click()
    },
    async uploadImage(event) {
      let data = new FormData();

      data.append('image', event.target.files[0]);
      let res = await this.$http.post("books/image/", data)
      this.book.image = res.data
    },
    confirm() {
      let validated = true;
      let required = ['title', 'description', 'author', 'image']
      required.forEach((e)=>{
        validated = validated && Object.prototype.hasOwnProperty.call(this.book, e) && this.book[e] != ""
      })
      if (validated) {this.$emit('confirm', this.book)} else {
        this.$message.error("Validation failed")
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin: 5px;
}
</style>