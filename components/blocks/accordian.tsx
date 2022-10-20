import { useState } from 'react'
import * as React from "react"
import { Section } from "../section"
import { Content } from "../content"
import { hasWord, getWordWith } from "../../helpers/utilities";
import { Buttons } from "../buttons";
import { TinaMarkdown } from "tinacms/dist/rich-text"

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const contentWidth = (style) => {
  const widthClass: string = getWordWith(style.contentWidth, "w-")
  return `${widthClass}`
}

const stripTopPadding = (paddingClasses) => {
  return paddingClasses.split(' ').filter(item => !item.includes('pt')).join(' ')
}
const borderColor = (borderClasses) => {
  return borderClasses.split(' ')[0]
}
const borderWidth = (borderClasses) => {
  const borderWidthString: string = borderClasses.split(' ')[1] || ''
  const lastDashIndex: number = borderWidthString.lastIndexOf('-')
  return borderWidthString.slice(lastDashIndex + 1)
}


const AccordianItem = ({ data, index, cardstyle, isLast, parentField = "" }) => {
  const [active, setActive] = useState(false);
  const borderWidthClass = isLast ? '' : `border-b-${borderWidth(cardstyle?.borderStyles)}`

  return (
    <div className={`${borderWidthClass} first:border-t-0 last:border-b-0 ${borderColor(cardstyle?.borderStyles)} ${cardstyle?.fillStyles}`}>
      <div className={`relative cursor-pointer ${cardstyle?.padding}`} onClick={() => setActive(!active)}>
        <h4 className="text-body1 lg:text-body-lg">
          {data.label && (
            <p className={cardstyle?.labelStyles} data-tinafield={`${parentField}.${index}.label`}>{data.label}</p>
          )}
          {data.headline && (
            <h3 className={cardstyle?.headlineStyles} data-tinafield={`${parentField}.${index}.headline`}>{data.headline}</h3>
          )}
        </h4>
        <div className={`absolute right-5 top-3.5 sm:top-4 ${active ? 'opacity-10 transform rotate-180' : ''}`}>
          <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.92265 0.551269L7.5125 0.551269C7.04245 0.551269 6.78934 0.804374 6.78934 1.27442L6.78934 13.3873L2.48657 9.66303C2.16115 9.37377 1.76341 9.37377 1.47415 9.73535L0.64252 10.7839C0.353258 11.1455 0.389415 11.4709 0.750993 11.7963L7.5125 17.7624C7.7656 17.9793 7.91023 18.0878 8.1995 18.0878C8.56107 18.0878 8.63339 17.9793 8.8865 17.7624L15.6842 11.7963C16.0457 11.4709 16.0819 11.1455 15.7926 10.7839L14.961 9.73535C14.6717 9.33761 14.274 9.33761 13.9124 9.62687L9.64581 13.3511L9.64581 1.27442C9.64581 0.804374 9.3927 0.551269 8.92265 0.551269Z" fill="white" />
          </svg>
        </div>
      </div>

      <div className={`text-body1 lg:text-body-lg  ${borderColor(cardstyle?.borderStyles)} ${active ? '' : 'hidden'}`}>
        <div
          className={`relative flex-1 border-box ${stripTopPadding(cardstyle?.padding)}`}
        >
          <div className={`absolute inset-0 -z-1`} />
          {data.subhead && (
            <h4 className={cardstyle?.subheadStyles} data-tinafield={`${parentField}.${index}.subhead`}>{data.subhead}</h4>
          )}
          {data.text && (
            <div className={`markdown ${cardstyle?.textStyles}`} data-tinafield={`${parentField}.${index}.text`}>
              <TinaMarkdown content={data.text} />
            </div>
          )}
          {data.link && data.buttonLabel && (
            <Buttons buttons={[{
              link: data.link,
              label: data.buttonLabel,
              type: cardstyle?.buttonType
            }]} className="absolute bottom-4" data-tinafield={`${parentField}.${index}.link`} />
          )}

        </div>
        {data.link && !data.buttonLabel && (
          <a href={data.link} className="absolute inset-0 z-20" data-tinafield={`${parentField}.${index}.link.0`} />
        )}
      </div>
    </div>
  )
}

export const Accordian = ({ data, parentField = "" }) => {
  return (
    <Section
      background={data.background}
      navigationLabel={data.navigationLabel}
    >
      <div className={`max-w-desktop-full mx-auto ${data?.style?.padding} ${data.style?.textAlignment}`}>
        <div className={``}>
          <Content
            data={data}
            styles={data.style}
            alignment="text-center"
            width={contentWidth(data.style)}
            parentField={parentField}
            className="mx-auto"
          />
        </div>
        <div className='container max-w-7xl mx-auto'>
          <div className={`rounded-xl ${data.style?.textAlignment} border-${borderWidth(data.cardStyle?.borderStyles)} ${borderColor(data?.cardStyle?.borderStyles)} overflow-hidden`}>
            {data.items.map((item, index) => {
              const isLast = data.items?.length === index + 1
              return (
                <AccordianItem key={index} index={index} data={item} cardstyle={data.cardStyle} isLast={isLast} parentField={`${parentField}.items`} />
              )
            })}
          </div>
        </div>
      </div>
    </Section >
  )
}
