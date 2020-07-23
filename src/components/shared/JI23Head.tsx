import * as React from "react";
import Head from "next/head";
import HeadProps from "../../models/HeadProps";
import { formatOgpSetting } from "../../utils/FormatUtils";

const JI23Head: React.FC<HeadProps> = (props: HeadProps) => {
  const { title, description, image, url, type } = props;

  return (
    <Head>
      <title>{title + " | JI23-DEV"}</title>
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={formatOgpSetting(image, title)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@JJ_1123_I" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={formatOgpSetting(image, title)} />
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default JI23Head;
