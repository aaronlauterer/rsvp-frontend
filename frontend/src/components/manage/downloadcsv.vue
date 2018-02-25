<template>
  <v-btn flat @click="download"><v-icon>file_download</v-icon>Download</v-btn>
</template>

<script>
export default {
  props: {
    invites: {
      type: Array,
      required: true
    }
  },
  methods: {
    download () {
      let csv = convertArrayOfObjectsToCSV({
        data: this.invites
      })
      if (csv == null) return

      let blob = new Blob([csv])
      let a = window.document.createElement('a')
      a.href = window.URL.createObjectURL(blob, {type: 'text/CSV'})
      a.download = 'export.csv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}

function convertArrayOfObjectsToCSV (args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data

  data = args.data || null
  if (data == null || !data.length) {
    return null
  }

  columnDelimiter = args.columnDelimiter || ';'
  lineDelimiter = args.lineDelimiter || '\n'

  keys = Object.keys(data[0])

  result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  data.forEach(function (item) {
    ctr = 0
    keys.forEach(function (key) {
      if (ctr > 0) result += columnDelimiter
      if (key === 'comment' && typeof (item[key]) === 'string') {
        result += item[key].replace(/\r?\n/g, '<br>')
      } else {
        result += item[key]
      }
      ctr++
    })
    result += lineDelimiter
  })

  return result
}
</script>

<style>

</style>
