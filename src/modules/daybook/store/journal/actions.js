/* export const myActions = async ( {commit} ) => {

} */

import journalApi from "@/api/journalApi"

export const loadEntries = async ( {commit} ) => {

    const { data } = await journalApi.get('/entries.json')

    if (!data){
        commit('setEntries', [])
        return
    }

    const entries = []

    for(let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)

}

export const updateEntry = async ( {commit}, entry ) => {

    const {id, ...entryToSave} = entry // Creo un objecto copia de entry, pero con el ID excluido

    await journalApi.put(`/entries/${id}.json`, entryToSave)

    commit('updateEntry', {...entry})

}

export const createEntry = async ( {commit}, entry ) => {

    const {id, ...entryToSave} = entry

    const { data } = await journalApi.post('/entries.json', entryToSave)

    entryToSave.id = data.name

    commit('createEntry', entryToSave)

    return data.name

}

export const deleteEntry = async ( {commit}, id ) => {

    await journalApi.delete(`/entries/${id}.json`)

    commit('deleteEntry', id)

}