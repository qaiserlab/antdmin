export class Textman {
  
  static toTitleCase(text: string) {
    const sentence = text.toLowerCase().split(' ')

    for(let i = 0; i < sentence.length; i++) {
      if (sentence[i].length > 0) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
      }
    }
    
    return sentence.join(' ')
  }

}