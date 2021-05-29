var input = document.getElementById('input')
var tBody = document.getElementById('tBody')
var bodyHeader = document.getElementById('body-header')

input.addEventListener('change', (e) => {
    console.log('input files:', input.files)
})

document.addEventListener('submit', (e) => {
    e.preventDefault()
    tBody.innerHTML = ''
    tBody.appendChild(bodyHeader)

    if (input != null) {
        let tr 
        let thName
        let tdSize
        let tdLastModified
        
        var res = listFiles(input.files)
        
        res.files.forEach(file => {
            tr = document.createElement('tr')
            thName = document.createElement('th')
            tdSize = document.createElement('td')
            tdLastModified = document.createElement('td')
            
            thName.scope = 'row'
            thName.innerText = file.webkitRelativePath
            
            tdSize.innerText = file.size
            
            tdLastModified.innerText = file.lastModifiedDate
            
            tr.appendChild(thName)
            tr.appendChild(tdLastModified)
            tr.appendChild(tdSize)
            
            tBody.appendChild(tr)
        })

        tr = document.createElement('tr')
        thName = document.createElement('th')
        tdSize = document.createElement('td')

        tdSize.colSpan = 3
        thName.innerText = 'Total # of Files & Folders'

        tdSize.innerText = res.files.length

        tr.appendChild(thName)
        tr.appendChild(tdSize)

        tBody.appendChild(tr)

        tr = document.createElement('tr')
        thName = document.createElement('th')
        tdSize = document.createElement('td')

        tdSize.colSpan = 3
        thName.innerText = 'Total Size of Files & Folders'

        tdSize.innerText = res.totalSize + ' KiB'

        tr.appendChild(thName)
        tr.appendChild(tdSize)

        tBody.appendChild(tr)
    }
})

const listFiles = files => {
    let totalSize = 0
    let file
    const fileArr = []

    for (let idx = 0; idx < files.length; idx++) {
        file = files[idx]
        totalSize += file.size

        fileArr.push(file)
    }

    fileArr.sort((a, b) => a.size - b.size)

    return { files: fileArr, totalSize }
}