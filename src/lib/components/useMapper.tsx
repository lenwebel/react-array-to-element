import React from "react";

export interface IMapperProps<TItemType> {
  value: keyof TItemType;
  label?: keyof TItemType | Array<keyof TItemType>;
  placeholder?: keyof TItemType;
  title?: keyof TItemType;
  selectedValue?: any;
  selectedValueClass?: string;
  selectedItemChanged?: (event: keyof TItemType) => void;
}

/** If you assign a user defined React component ensure your component implements JSX.Element props
 * If you dontm then simple things like on OnClick will not work
 */
export function useMapper<TItemType>(props: {
  items: TItemType[];
  returnType: JSX.Element;
}) {
  var RType = (properties: typeof props.returnType.props) => ({
    ...props.returnType,
    props: properties,
  });

  return (
    p: IMapperProps<TItemType> &
      React.DetailedHTMLProps<React.HTMLAttributes<any>, any>
  ) => {
    const clicked = (event: React.MouseEvent<any>) => {
      p.selectedItemChanged && p.selectedItemChanged(event.currentTarget.value);
    };
    const classes = (value: any) => {
      console.log(value === p.selectedValue, p.selectedValueClass);
      const v =
        (p.className || "") +
        " " +
        (props.returnType.props.className || "") +
        " " +
        // eslint-disable-next-line eqeqeq
        (p.selectedValue == `${value}` ? p.selectedValueClass || "" : "");
      return v;
    };

    const getLabels = (item: TItemType) =>
      Array.isArray(p.label)
        ? p.label.map((i) => item[i]).join(" ")
        : item[p.label as keyof TItemType];

    return (
      <>
        {props.items.map((item: TItemType, index: number) => (
          <RType
            value={item[p.value as keyof TItemType]}
            key={index}
            className={classes(item[p.value as keyof TItemType])}
            style={{ ...(props.returnType.props.style, p.style) }}
            onClick={clicked}
          >
            {getLabels(item)}
            {p.children}
          </RType>
        ))}
      </>
    );
  };
}
