import * as React from "react";
import { linkTarget } from "../../helpers/utilities";
import { Section } from "../section";

const Card = ({ data, index, tw, parentField = ""  }) => {
  return (
    <div className={tw.card} >
      <div className={tw.cardImageWrap}>
        {data.image && (
          <img
            alt={data.image.alt || data.headline}
            src={data.image.src}
            className={tw.cardImage}
          />
        )}
      </div>
      <div className={tw.cardContentWrap}>
        <div className={`markdown ${tw.content}`}>
          {data.label &&<h4 className={tw.cardLabel} >{data.label}</h4>}
          {data.headline && <h2 className={tw.cardHeadline}>{data.headline}</h2>}
          {data.subhead && <h3 className={tw.cardSubhead}>{data.subhead}</h3>}
          {data.text && (
            <div className={tw.cardText}>
              <div dangerouslySetInnerHTML={{ __html: data.text }} />
            </div>
          )}
        </div>
        {data.link && data.buttonLabel && (
          <div className={tw.cardButtons}>
            <a
              className={tw.cardButton}
              href={data.link}
              target={linkTarget(data.link)}
              key={index}
            >
              { data.buttonLabel }
            </a>
          </div>
        )}
      </div>
    </div>
  )
}


export const TailwindCards = ({ data, parentField = "" }) => {
  const tw = data.tailwind || {};
  return (
    <Section className={tw.section} background={data.background} navigationLabel={data.navigationLabel}>
      <div className={tw.background}></div>
      <div className={tw.wrap}>
        <div className={tw.contentWrap}>
          <div className={tw.content}>
            {data.label &&<h4 className={tw.label}>{data.label}</h4>}
            {data.headline && <h2 className={tw.headline} >{data.headline}</h2>}
            {data.subhead && <h3 className={tw.subhead} >{data.subhead}</h3>}
            {data.body && (
              <div className={tw.text} >
                <div dangerouslySetInnerHTML={{ __html: data.body }} />
              </div>
            )}
            {data.buttons && (
              <div className={tw.buttons}>
                {data.buttons &&
                  data.buttons.map(function (button, index) {
                    const element = (
                        <a
                          className={tw.button}
                          href={button.link}
                          target={linkTarget(button.link)}
                          key={index}
                        >
                          { button.label }
                        </a>
                      );
                    return element;
                  })}
              </div>
            )}
          </div>
        </div>
        <div className={tw.cardWrap}>
          {data.items && (
            data.items.map(function (block, index) {
              return <Card
                key={index}
                index={index}
                data={block}
                tw={data.tailwind || {}}
                parentField={`${parentField}.items`}
              />
            })
          )}
        </div>
      </div>
    </Section>
  );
};
