import first from "@assets/img/1st.png"
import second from "@assets/img/2nd.png"
import third from "@assets/img/3rd.png"
import fourth from "@assets/img/4th.png"

export function rankColor(index: number) {
  const rankIndex = index + 1

  let color: string

  if (rankIndex === 1) {
    color = "#FFD700"
  } else if (rankIndex === 2) {
    color = "#D9D9D9"
  } else if (rankIndex === 3) {
    color = "#CD7F32"
  } else if (rankIndex === 4) {
    color = "#FF0800"
  } else {
    color = "#000000"
  }
  return {
    color: color
  }
}
export function rankImage(index: number) {
  const rankIndex = index + 1

  let image: string

  if (rankIndex === 1) {
    image = first
  } else if (rankIndex === 2) {
    image = second
  } else if (rankIndex === 3) {
    image = third
  } else if (rankIndex === 4) {
    image = fourth
  } else {
    image = ""
  }

  return image
}

export function rankBackgroundColor(index: number) {
  if (index % 2 === 1) {return {backgroundColor: "#666666", opacity: 0.9}} else {return {backgroundColor: "#444444", opacity: 0.7}}
}
