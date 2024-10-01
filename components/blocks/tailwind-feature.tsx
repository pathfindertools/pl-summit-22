import * as React from "react";
import { linkTarget } from "../../helpers/utilities";
import { Section } from "../section";

export const TailwindFeature = ({ data, parentField = ""  }) => {
  const tw = data.tailwind || {};
  

  return (
    <Section className={tw.section} background={data.background} navigationLabel={data.navigationLabel}>
      <div className={tw.background}></div>
      <div className={tw.wrap}>
        <div className={tw.imageWrap}>
          {data.image?.src && (
            <img className={tw.image} alt={data.image?.alt} src={data.image?.src} />
          )}
        </div>
        <div className={tw.contentWrap}>
          <div className={`markdown ${tw.content}`}>
            {data.label &&<h4 className={tw.label}>{data.label}</h4>}
            {data.headline && <h2 className={tw.headline}>{data.headline}</h2>}
            {data.subhead && <h3 className={tw.subhead}>{data.subhead}</h3>}
            {data.body && (
              <div className={tw.text}>
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
      </div>
    </Section>
  );
};
