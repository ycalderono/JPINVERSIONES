
<div className="flex flex-row justify-center">
<div className="flex flex-col items-center">
  <Card className="w-[191px] h-[264px] mx-2 mb-4">
    <Image
      alt="Card background"
      className="w-[191px] h-[264px] object-cover rounded-lg"
      src="https://nextui.org/images/hero-card-complete.jpeg"
    />
  </Card>
  <Card className="w-[191px] h-[264px] mx-2 mb-4">
    <Image
      alt="Card background"
      className="w-[191px] h-[264px] object-cover rounded-lg"
      src="https://nextui.org/images/hero-card-complete.jpeg"
    />
  </Card>
</div>
<div className="flex flex-col items-center">
  <Card className="w-[191px] h-[264px] mx-2 mb-4">
    <Image
      alt="Card background"
      className="w-[191px] h-[264px] object-cover rounded-lg "
      src="https://nextui.org/images/hero-card-complete.jpeg"
    />
  </Card>
  <Card className="w-[191px] h-[264px] mx-2 mb-4">
    <Image
      alt="Card background"
      className="object-cover w-[191px] h-[264px] rounded-lg "
      src="https://nextui.org/images/hero-card-complete.jpeg"
    />
  </Card>
</div>


<div className="flex flex-col items-center justify-center pb-8 w-[400px]">
          <Tabs selectedKey={selectedTab} onSelectionChange={handleTabChange} aria-label="Profile Tabs">
            <Tab key="wallpapers" title="Tus fondos de pantalla">
              <div>Contenido de fondos de pantalla</div>
            </Tab>
            <Tab key="transactions" title="Tus transacciones">
              <TransactionsAccordion />
            </Tab>
          </Tabs>
        </div>