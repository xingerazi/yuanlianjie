<template>
  <div>
    <button @click="downloadMarkdownFile">下载Markdown文件</button>
  </div>
</template>

<script>
import { saveAs } from 'file-saver';

export default {
  methods: {
    downloadMarkdownFile() {
      // 构建Markdown文件的完整URL，假设文件位于public目录下
      const markdownFileUrl = process.env.BASE_URL + '课程大纲.md';

      // 使用FileSaver.js下载Markdown文件
      fetch(markdownFileUrl)
        .then(response => response.blob())
        .then(blob => {
          saveAs(blob, '课程大纲.md');
        })
        .catch(error => {
          console.error('下载Markdown文件时出错：', error);
        });
    }
  }
};
</script>